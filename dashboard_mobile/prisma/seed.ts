import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const categorias = ['Electrónica', 'Ropa', 'Alimentos', 'Hogar', 'Deportes']

async function main() {
  console.log('🌱 Iniciando seed de la base de datos...')

  // Limpiar datos existentes
  await prisma.producto.deleteMany()

  // Crear productos de ejemplo
  const productos = []
  for (let i = 1; i <= 50; i++) {
    productos.push({
      nombre: `Producto ${i}`,
      categoria: categorias[Math.floor(Math.random() * categorias.length)],
      precio: parseFloat((Math.random() * 1000 + 10).toFixed(2)),
      stock: Math.floor(Math.random() * 100),
      ventas: Math.floor(Math.random() * 500),
      rating: parseFloat((Math.random() * 5).toFixed(1)),
      activo: Math.random() > 0.1, // 90% activos
    })
  }

  await prisma.producto.createMany({
    data: productos,
  })

  console.log(`✅ Se crearon ${productos.length} productos`)
}

main()
  .catch((e) => {
    console.error('❌ Error en seed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })