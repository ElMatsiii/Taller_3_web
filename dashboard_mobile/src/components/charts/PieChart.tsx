'use client'

import { Pie } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from 'chart.js'
import { Product } from '@/store/slices/productSlice'

ChartJS.register(ArcElement, Tooltip, Legend, Title)

interface PieChartProps {
  products: Product[]
}

export default function PieChartComponent({ products }: PieChartProps) {
  const activos = products.filter((p) => p.activo).length
  const inactivos = products.length - activos

  const data = {
    labels: ['Activos', 'Inactivos'],
    datasets: [
      {
        label: 'Productos',
        data: [activos, inactivos],
        backgroundColor: ['rgba(16, 185, 129, 0.8)', 'rgba(239, 68, 68, 0.8)'],
        borderColor: ['rgb(16, 185, 129)', 'rgb(239, 68, 68)'],
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
        text: 'Estado de Productos',
        font: {
          size: 16,
          weight: 'bold' as const,
        },
      },
    },
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border">
      <div className="h-[300px]">
        <Pie data={data} options={options} />
      </div>
    </div>
  )
}