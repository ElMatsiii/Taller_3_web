import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '../../../lib/prisma'
import { z } from 'zod'


const ProductSchema = z.object({
  nombre: z.string().min(1),
  categoria: z.string().min(1),
  precio: z.number().positive(),
  stock: z.number().int().nonnegative(),
  ventas: z.number().int().nonnegative().optional(),
  rating: z.number().min(0).max(5).optional(),
  activo: z.boolean().optional(),
})


export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    
    const categoria = searchParams.get('categoria')
    const precioMin = searchParams.get('precioMin')
    const precioMax = searchParams.get('precioMax')
    const stockMin = searchParams.get('stockMin')
    const soloActivos = searchParams.get('soloActivos')
    const ordenPor = searchParams.get('ordenPor') || 'nombre'
    const ordenDireccion = searchParams.get('ordenDireccion') || 'asc'

    const where: any = {}

    if (categoria && categoria !== 'todas') {
      where.categoria = categoria
    }

    if (precioMin || precioMax) {
      where.precio = {}
      if (precioMin) where.precio.gte = parseFloat(precioMin)
      if (precioMax) where.precio.lte = parseFloat(precioMax)
    }

    if (stockMin) {
      where.stock = { gte: parseInt(stockMin) }
    }

    if (soloActivos === 'true') {
      where.activo = true
    }

    const productos = await prisma.producto.findMany({
      where,
      orderBy: {
        [ordenPor]: ordenDireccion,
      },
    })

    return NextResponse.json(productos)
  } catch (error) {
    console.error('Error al obtener productos:', error)
    return NextResponse.json(
      { error: 'Error al obtener productos' },
      { status: 500 }
    )
  }
}


export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = ProductSchema.parse(body)

    const producto = await prisma.producto.create({
      data: validatedData,
    })

    return NextResponse.json(producto, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Datos inválidos', details: error.errors },
        { status: 400 }
      )
    }
    console.error('Error al crear producto:', error)
    return NextResponse.json(
      { error: 'Error al crear producto' },
      { status: 500 }
    )
  }
}