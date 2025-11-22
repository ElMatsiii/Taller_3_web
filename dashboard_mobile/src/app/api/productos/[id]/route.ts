import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '../../../../lib/prisma'
import { z } from 'zod'

const ProductSchema = z.object({
  nombre: z.string().min(1).optional(),
  categoria: z.string().min(1).optional(),
  precio: z.number().positive().optional(),
  stock: z.number().int().nonnegative().optional(),
  ventas: z.number().int().nonnegative().optional(),
  rating: z.number().min(0).max(5).optional(),
  activo: z.boolean().optional(),
})

// GET - Obtener un producto por ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const producto = await prisma.producto.findUnique({
      where: { id },
    })

    if (!producto) {
      return NextResponse.json(
        { error: 'Producto no encontrado' },
        { status: 404 }
      )
    }

    return NextResponse.json(producto)
  } catch (error) {
    console.error('Error al obtener producto:', error)
    return NextResponse.json(
      { error: 'Error al obtener producto' },
      { status: 500 }
    )
  }
}

// PUT - Actualizar producto
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const validatedData = ProductSchema.parse(body)

    const producto = await prisma.producto.update({
      where: { id },
      data: validatedData,
    })

    return NextResponse.json(producto)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Datos inválidos', details: error.errors },
        { status: 400 }
      )
    }
    console.error('Error al actualizar producto:', error)
    return NextResponse.json(
      { error: 'Error al actualizar producto' },
      { status: 500 }
    )
  }
}

// DELETE - Eliminar producto
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    await prisma.producto.delete({
      where: { id },
    })

    return NextResponse.json({ message: 'Producto eliminado' })
  } catch (error) {
    console.error('Error al eliminar producto:', error)
    return NextResponse.json(
      { error: 'Error al eliminar producto' },
      { status: 500 }
    )
  }
}