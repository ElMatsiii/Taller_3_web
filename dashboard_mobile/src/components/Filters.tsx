'use client'

import { useAppDispatch, useAppSelector } from '@/store/hooks'
import {
  setCategoria,
  setPrecioMin,
  setPrecioMax,
  setStockMin,
  setSoloActivos,
  setOrdenPor,
  setOrdenDireccion,
  resetFilters,
} from '@/store/slices/filtersSlice'
import { Filter, X } from 'lucide-react'

const categorias = ['todas', 'Electrónica', 'Ropa', 'Alimentos', 'Hogar', 'Deportes']

export default function Filters() {
  const dispatch = useAppDispatch()
  const filters = useAppSelector((state) => state.filters)

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-gray-600" />
          <h2 className="text-lg font-semibold text-gray-900">Filtros</h2>
        </div>
        <button
          onClick={() => dispatch(resetFilters())}
          className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900"
        >
          <X className="w-4 h-4" />
          Limpiar
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Categoría */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Categoría
          </label>
          <select
            value={filters.categoria}
            onChange={(e) => dispatch(setCategoria(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {categorias.map((cat) => (
              <option key={cat} value={cat}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </option>
            ))}
          </select>
        </div>

        {/* Precio Mínimo */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Precio Mín: ${filters.precioMin}
          </label>
          <input
            type="range"
            min="0"
            max="10000"
            step="10"
            value={filters.precioMin}
            onChange={(e) => dispatch(setPrecioMin(Number(e.target.value)))}
            className="w-full"
          />
        </div>

        {/* Precio Máximo */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Precio Máx: ${filters.precioMax}
          </label>
          <input
            type="range"
            min="0"
            max="10000"
            step="10"
            value={filters.precioMax}
            onChange={(e) => dispatch(setPrecioMax(Number(e.target.value)))}
            className="w-full"
          />
        </div>

        {/* Stock Mínimo */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Stock Mín: {filters.stockMin}
          </label>
          <input
            type="range"
            min="0"
            max="100"
            value={filters.stockMin}
            onChange={(e) => dispatch(setStockMin(Number(e.target.value)))}
            className="w-full"
          />
        </div>

        {/* Solo Activos */}
        <div className="flex items-center">
          <input
            type="checkbox"
            id="soloActivos"
            checked={filters.soloActivos}
            onChange={(e) => dispatch(setSoloActivos(e.target.checked))}
            className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
          />
          <label htmlFor="soloActivos" className="ml-2 text-sm text-gray-700">
            Solo productos activos
          </label>
        </div>

        {/* Ordenar por */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Ordenar por
          </label>
          <select
            value={filters.ordenPor}
            onChange={(e) => dispatch(setOrdenPor(e.target.value as any))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="nombre">Nombre</option>
            <option value="precio">Precio</option>
            <option value="ventas">Ventas</option>
            <option value="rating">Rating</option>
          </select>
        </div>

        {/* Dirección */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Dirección
          </label>
          <select
            value={filters.ordenDireccion}
            onChange={(e) => dispatch(setOrdenDireccion(e.target.value as any))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="asc">Ascendente</option>
            <option value="desc">Descendente</option>
          </select>
        </div>
      </div>
    </div>
  )
}