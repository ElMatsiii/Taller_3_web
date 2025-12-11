'use client'

import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Product } from '@/store/slices/productSlice'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

interface LineChartProps {
  products: Product[]
}

export default function LineChartComponent({ products }: LineChartProps) {
  const ventasPorCategoria = products.reduce((acc, product) => {
    acc[product.categoria] = (acc[product.categoria] || 0) + product.ventas
    return acc
  }, {} as Record<string, number>)

  const data = {
    labels: Object.keys(ventasPorCategoria),
    datasets: [
      {
        label: 'Ventas Totales',
        data: Object.values(ventasPorCategoria),
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4,
        fill: true,
        pointRadius: 5,
        pointHoverRadius: 7,
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
        text: 'Ventas por Categoría',
        font: {
          size: 16,
          weight: 'bold' as const,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border">
      <div className="h-[300px]">
        <Line data={data} options={options} />
      </div>
    </div>
  )
}