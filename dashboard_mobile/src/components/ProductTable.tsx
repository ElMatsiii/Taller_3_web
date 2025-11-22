'use client'

import { useState } from 'react'
import { Product } from '@/store/slices/productSlice'
import { Pencil, Trash2, Eye } from 'lucide-react'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'

interface ProductTableProps {
  products: Product[]
  onRefresh: () => void
}

export default function ProductTable({ products, onRefresh }: ProductTableProps) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async (id: string) => {
    if (!confirm('¿Estás seguro de eliminar este producto?')) return

    setIsDeleting(true)
    try {
      const res = await fetch(`/api/productos/${id}`, {
        method: 'DELETE',
      })

      if (res.ok) {
        onRefresh()
      } else {
        alert('Error al eliminar producto')
      }
    } catch (error) {
      console.error('Error:', error)
      alert('Error al eliminar producto')
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold text-gray-900">
          Productos ({products.length})
        </h2>
      </div>

      {/* Tabla Desktop */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Producto
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Categoría
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Precio
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Stock
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Ventas
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Rating
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Estado
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {products.map((product) => (
              <tr key={product.id} className="hover:bg-gray-50">
                <td className="px-4 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {product.nombre}
                  </div>
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                    {product.categoria}
                  </span>
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                  ${product.precio.toFixed(2)}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                  {product.stock}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                  {product.ventas}
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <span className="text-sm text-gray-900">{product.rating}</span>
                    <span className="ml-1 text-yellow-400">★</span>
                  </div>
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded-full ${
                      product.activo
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {product.activo ? 'Activo' : 'Inactivo'}
                  </span>
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setSelectedProduct(product)}
                      className="text-blue-600 hover:text-blue-800"
                      title="Ver detalles"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(product.id)}
                      disabled={isDeleting}
                      className="text-red-600 hover:text-red-800 disabled:opacity-50"
                      title="Eliminar"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Cards Mobile */}
      <div className="md:hidden divide-y divide-gray-200">
        {products.map((product) => (
          <div key={product.id} className="p-4">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-medium text-gray-900">{product.nombre}</h3>
                <span className="text-xs text-gray-500">{product.categoria}</span>
              </div>
              <span
                className={`px-2 py-1 text-xs font-medium rounded-full ${
                  product.activo
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}
              >
                {product.activo ? 'Activo' : 'Inactivo'}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-sm mb-3">
              <div>
                <span className="text-gray-500">Precio:</span>{' '}
                <span className="font-medium">${product.precio.toFixed(2)}</span>
              </div>
              <div>
                <span className="text-gray-500">Stock:</span>{' '}
                <span className="font-medium">{product.stock}</span>
              </div>
              <div>
                <span className="text-gray-500">Ventas:</span>{' '}
                <span className="font-medium">{product.ventas}</span>
              </div>
              <div>
                <span className="text-gray-500">Rating:</span>{' '}
                <span className="font-medium">{product.rating} ★</span>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setSelectedProduct(product)}
                className="flex-1 px-3 py-2 bg-blue-50 text-blue-600 rounded-lg text-sm font-medium hover:bg-blue-100"
              >
                Ver detalles
              </button>
              <button
                onClick={() => handleDelete(product.id)}
                disabled={isDeleting}
                className="px-3 py-2 bg-red-50 text-red-600 rounded-lg text-sm font-medium hover:bg-red-100 disabled:opacity-50"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {products.length === 0 && (
        <div className="p-8 text-center text-gray-500">
          No se encontraron productos
        </div>
      )}

      {/* Modal de detalles */}
      {selectedProduct && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          onClick={() => setSelectedProduct(null)}
        >
          <div
            className="bg-white rounded-lg p-6 max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              {selectedProduct.nombre}
            </h3>
            <div className="space-y-3">
              <div>
                <span className="text-sm text-gray-500">Categoría:</span>
                <p className="font-medium">{selectedProduct.categoria}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-sm text-gray-500">Precio:</span>
                  <p className="font-medium">${selectedProduct.precio.toFixed(2)}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Stock:</span>
                  <p className="font-medium">{selectedProduct.stock}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Ventas:</span>
                  <p className="font-medium">{selectedProduct.ventas}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Rating:</span>
                  <p className="font-medium">{selectedProduct.rating} ★</p>
                </div>
              </div>
              <div>
                <span className="text-sm text-gray-500">Estado:</span>
                <p className="font-medium">
                  {selectedProduct.activo ? 'Activo' : 'Inactivo'}
                </p>
              </div>
              <div>
                <span className="text-sm text-gray-500">Fecha de creación:</span>
                <p className="font-medium">
                  {format(new Date(selectedProduct.fechaCreado), 'PPP', { locale: es })}
                </p>
              </div>
            </div>
            <button
              onClick={() => setSelectedProduct(null)}
              className="mt-6 w-full px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  )
}