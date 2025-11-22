'use client'

import { Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Product } from '@/store/slices/productSlice'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

interface BarChartProps {
  products: Product[]
}

export default function BarChartComponent({ products }: BarChartProps) {
  // Agrupar productos por categoría
  const categorias = products.reduce((acc, product) => {
    acc[product.categoria] = (acc[product.categoria] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  const data = {
    labels: Object.keys(categorias),
    datasets: [
      {
        label: 'Productos por Categoría',
        data: Object.values(categorias),
        backgroundColor: [
          'rgba(59, 130, 246, 0.8)',
          'rgba(16, 185, 129, 0.8)',
          'rgba(245, 158, 11, 0.8)',
          'rgba(239, 68, 68, 0.8)',
          'rgba(139, 92, 246, 0.8)',
        ],
        borderColor: [
          'rgb(59, 130, 246)',
          'rgb(16, 185, 129)',
          'rgb(245, 158, 11)',
          'rgb(239, 68, 68)',
          'rgb(139, 92, 246)',
        ],
        borderWidth: 2,
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
        text: 'Productos por Categoría',
        font: {
          size: 16,
          weight: 'bold' as const,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
        },
      },
    },
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border">
      <div className="h-[300px]">
        <Bar data={data} options={options} />
      </div>
    </div>
  )
}