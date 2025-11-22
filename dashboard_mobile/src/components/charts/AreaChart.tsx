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
  Filler,
} from 'chart.js'
import { Product } from '@/store/slices/productSlice'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

interface AreaChartProps {
  products: Product[]
}

export default function AreaChartComponent({ products }: AreaChartProps) {
  // Agrupar stock por categoría
  const stockPorCategoria = products.reduce((acc, product) => {
    acc[product.categoria] = (acc[product.categoria] || 0) + product.stock
    return acc
  }, {} as Record<string, number>)

  const data = {
    labels: Object.keys(stockPorCategoria),
    datasets: [
      {
        label: 'Stock Total',
        data: Object.values(stockPorCategoria),
        borderColor: 'rgb(16, 185, 129)',
        backgroundColor: 'rgba(16, 185, 129, 0.3)',
        fill: true,
        tension: 0.4,
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
        text: 'Stock por Categoría',
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