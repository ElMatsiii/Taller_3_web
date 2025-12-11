'use client'

import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { setProducts, setLoading } from '@/store/slices/productSlice'
import Filters from './Filters'
import ProductTable from './ProductTable'
import CreateProduct from './CreateProduct'
import BarChartComponent from './charts/BarChart'
import LineChartComponent from './charts/LineChart'
import PieChartComponent from './charts/PieChart'
import AreaChartComponent from './charts/AreaChart'
import RadarChartComponent from './charts/RadarChart'
import { BarChart3, RefreshCw } from 'lucide-react'

export default function Dashboard() {
  const dispatch = useAppDispatch()
  const { products, loading } = useAppSelector((state) => state.products)
  const filters = useAppSelector((state) => state.filters)
  const [showCreateModal, setShowCreateModal] = useState(false)

  const fetchProducts = async () => {
    dispatch(setLoading(true))
    try {
      const params = new URLSearchParams()
      if (filters.categoria !== 'todas') params.append('categoria', filters.categoria)
      if (filters.precioMin > 0) params.append('precioMin', filters.precioMin.toString())
      if (filters.precioMax < 10000) params.append('precioMax', filters.precioMax.toString())
      if (filters.stockMin > 0) params.append('stockMin', filters.stockMin.toString())
      if (filters.soloActivos) params.append('soloActivos', 'true')
      params.append('ordenPor', filters.ordenPor)
      params.append('ordenDireccion', filters.ordenDireccion)

      const res = await fetch(`/api/productos?${params.toString()}`)
      const data = await res.json()
      dispatch(setProducts(data))
    } catch (error) {
      console.error('Error al cargar productos:', error)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [filters])

  return (
    <div className="min-h-screen bg-gray-50">
      {}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center gap-3">
              <BarChart3 className="w-8 h-8 text-blue-600" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Dashboard Móvil</h1>
                <p className="text-sm text-gray-500">DataMobile Analytics</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={fetchProducts}
                disabled={loading}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors disabled:opacity-50"
              >
                <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                <span className="hidden sm:inline">Actualizar</span>
              </button>
              <button
                onClick={() => setShowCreateModal(true)}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                + Nuevo Producto
              </button>
            </div>
          </div>
        </div>
      </header>

      {}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {}
        <div className="mb-6">
          <Filters />
        </div>

        {}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow-sm border">
            <p className="text-sm text-gray-600">Total Productos</p>
            <p className="text-2xl font-bold text-gray-900">{products.length}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border">
            <p className="text-sm text-gray-600">Ventas Totales</p>
            <p className="text-2xl font-bold text-blue-600">
              {products.reduce((sum, p) => sum + p.ventas, 0)}
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border">
            <p className="text-sm text-gray-600">Stock Total</p>
            <p className="text-2xl font-bold text-green-600">
              {products.reduce((sum, p) => sum + p.stock, 0)}
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border">
            <p className="text-sm text-gray-600">Precio Promedio</p>
            <p className="text-2xl font-bold text-purple-600">
              ${products.length > 0 
                ? (products.reduce((sum, p) => sum + p.precio, 0) / products.length).toFixed(2)
                : '0.00'
              }
            </p>
          </div>
        </div>

        {}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <BarChartComponent products={products} />
          <LineChartComponent products={products} />
          <PieChartComponent products={products} />
          <AreaChartComponent products={products} />
        </div>

        <div className="mb-6">
          <RadarChartComponent products={products} />
        </div>

        {}
        <ProductTable products={products} onRefresh={fetchProducts} />
      </div>

      {}
      {showCreateModal && (
        <CreateProduct
          onClose={() => setShowCreateModal(false)}
          onSuccess={() => {
            setShowCreateModal(false)
            fetchProducts()
          }}
        />
      )}
    </div>
  )
}