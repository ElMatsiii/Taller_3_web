'use client'

import { Radar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  Title,
} from 'chart.js'
import { Product } from '@/store/slices/productSlice'

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  Title
)

interface RadarChartProps {
  products: Product[]
}

export default function RadarChartComponent({ products }: RadarChartProps) {
  // Calcular promedios por categoría
  const categorias = ['Electrónica', 'Ropa', 'Alimentos', 'Hogar', 'Deportes']
  
  const promedios = categorias.map((cat) => {
    const productosCategoria = products.filter((p) => p.categoria === cat)
    if (productosCategoria.length === 0) return 0
    const suma = productosCategoria.reduce((sum, p) => sum + p.rating, 0)
    return (suma / productosCategoria.length).toFixed(1)
  })

  const precios = categorias.map((cat) => {
    const productosCategoria = products.filter((p) => p.categoria === cat)
    if (productosCategoria.length === 0) return 0
    const suma = productosCategoria.reduce((sum, p) => sum + p.precio, 0)
    return (suma / productosCategoria.length).toFixed(0)
  })

  const data = {
    labels: categorias,
    datasets: [
      {
        label: 'Rating Promedio',
        data: promedios,
        borderColor: 'rgb(245, 158, 11)',
        backgroundColor: 'rgba(245, 158, 11, 0.2)',
        borderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Rating Promedio por Categoría',
        font: {
          size: 16,
          weight: 'bold' as const,
        },
      },
    },
    scales: {
      r: {
        beginAtZero: true,
        max: 5,
        ticks: {
          stepSize: 1,
        },
      },
    },
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border">
      <div className="h-[400px]">
        <Radar data={data} options={options} />
      </div>
    </div>
  )
}