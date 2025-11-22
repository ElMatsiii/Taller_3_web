'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import { ArrowLeft, Trash2 } from 'lucide-react'

interface Product {
  id: string
  nombre: string
  categoria: string
  precio: number
  stock: number
  ventas: number
  rating: number
  fechaCreado: string
  activo: boolean
}

export default function ProductDetailPage() {
  const router = useRouter()
  const params = useParams()
  const id = params?.id as string // Extraer el id correctamente
  
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!id) return

    const fetchProduct = async () => {
      try {
        setLoading(true)
        const res = await fetch(`/api/productos/${id}`)
        
        if (res.ok) {
          const data = await res.json()
          setProduct(data)
          setError(null)
        } else {
          setError('Producto no encontrado')
        }
      } catch (error) {
        console.error('Error:', error)
        setError('Error al cargar el producto')
      } finally {
        setLoading(false)
      }
    }
    
    fetchProduct()
  }, [id])

  const handleDelete = async () => {
    if (!id || !confirm('¿Estás seguro de eliminar este producto?')) return
    
    try {
      const res = await fetch(`/api/productos/${id}`, {
        method: 'DELETE',
      })
      if (res.ok) {
        router.push('/')
      } else {
        alert('Error al eliminar el producto')
      }
    } catch (error) {
      console.error('Error:', error)
      alert('Error al eliminar el producto')
    }
  }

  // Estado de carga
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
          <p className="text-gray-500">Cargando producto...</p>
        </div>
      </div>
    )
  }

  // Estado de error o producto no encontrado
  if (error || !product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            {error || 'Producto no encontrado'}
          </h2>
          <button
            onClick={() => router.push('/')}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Volver al Dashboard
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button
            onClick={() => router.push('/')}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft className="w-5 h-5" />
            Volver al Dashboard
          </button>
          <h1 className="text-2xl font-bold text-gray-900">Detalle del Producto</h1>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          {/* Header del producto */}
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">{product.nombre}</h2>
              <span className="px-3 py-1 text-sm font-medium bg-blue-100 text-blue-800 rounded-full">
                {product.categoria}
              </span>
            </div>
            <span
              className={`px-3 py-1 text-sm font-medium rounded-full ${
                product.activo
                  ? 'bg-green-100 text-green-800'
                  : 'bg-red-100 text-red-800'
              }`}
            >
              {product.activo ? 'Activo' : 'Inactivo'}
            </span>
          </div>

          {/* Información principal */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500 mb-1">Precio</p>
              <p className="text-3xl font-bold text-gray-900">${product.precio.toFixed(2)}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500 mb-1">Stock Disponible</p>
              <p className="text-3xl font-bold text-green-600">{product.stock} unidades</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500 mb-1">Ventas Totales</p>
              <p className="text-3xl font-bold text-blue-600">{product.ventas}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500 mb-1">Rating</p>
              <p className="text-3xl font-bold text-yellow-600">{product.rating} ★</p>
            </div>
          </div>

          {/* Información adicional */}
          <div className="border-t pt-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Información Adicional</h3>
            <div className="space-y-3">
              <div>
                <span className="text-sm text-gray-500">ID del Producto:</span>
                <p className="font-mono text-sm text-gray-700">{product.id}</p>
              </div>
              <div>
                <span className="text-sm text-gray-500">Fecha de Creación:</span>
                <p className="text-gray-700">
                  {format(new Date(product.fechaCreado), "PPP 'a las' p", { locale: es })}
                </p>
              </div>
              <div>
                <span className="text-sm text-gray-500">Valor Total en Inventario:</span>
                <p className="text-xl font-semibold text-gray-900">
                  ${(product.precio * product.stock).toFixed(2)}
                </p>
              </div>
            </div>
          </div>

          {/* Estadísticas */}
          <div className="border-t pt-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Estadísticas</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-gray-600">Ingreso por Ventas</p>
                <p className="text-2xl font-bold text-blue-600">
                  ${(product.precio * product.ventas).toFixed(2)}
                </p>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <p className="text-sm text-gray-600">Rotación</p>
                <p className="text-2xl font-bold text-green-600">
                  {product.stock > 0 ? ((product.ventas / product.stock) * 100).toFixed(1) : 0}%
                </p>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <p className="text-sm text-gray-600">Rating Promedio</p>
                <p className="text-2xl font-bold text-purple-600">
                  {product.rating}/5.0
                </p>
              </div>
            </div>
          </div>

          {/* Acciones */}
          <div className="border-t pt-6">
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => router.push('/')}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Volver
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
              >
                <Trash2 className="w-4 h-4" />
                Eliminar Producto
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}