# 📊 Dashboard Móvil - DataMobile

**Taller N°3 - Introducción al Desarrollo Web Móvil**  
Universidad Católica del Norte - Noviembre 2025

## 👥 Información del Grupo

- **Grupo N°:** [COMPLETAR]
- **Integrantes:**
  - [Nombre Completo] - RUT: [XX.XXX.XXX-X]
  - [Nombre Completo] - RUT: [XX.XXX.XXX-X]
  - [Nombre Completo] - RUT: [XX.XXX.XXX-X]

---

## 📝 Descripción del Proyecto

Aplicación web móvil desarrollada con **Next.js** que permite visualizar y gestionar productos mediante un dashboard interactivo. El proyecto implementa:

- 🎯 **CRUD completo** de productos
- 📊 **5 tipos de gráficos** interactivos (Barras, Líneas, Torta, Área, Radar)
- 🔍 **Filtros dinámicos** con persistencia
- 📱 **Diseño Mobile First** totalmente responsivo
- 🗄️ **PostgreSQL** como base de datos
- 🔄 **Redux Toolkit** para gestión de estado

---

## 🛠️ Tecnologías Utilizadas

### Frontend
- **Next.js 16.0.3** - Framework React full-stack
- **React 19** - Librería UI
- **Redux Toolkit** - Gestión de estado global
- **Tailwind CSS** - Estilos y responsividad
- **Chart.js & Recharts** - Visualización de datos

### Backend & Base de Datos
- **Next.js API Routes** - Backend integrado
- **Prisma 6.19** - ORM para PostgreSQL
- **PostgreSQL** - Base de datos (Neon)
- **Zod** - Validación de datos

---

## 📦 Estructura del Proyecto

```
dashboard_mobile/
├── prisma/
│   ├── schema.prisma          # Esquema de la BD
│   ├── seed.ts                # Datos de prueba
│   └── migrations/            # Migraciones
├── src/
│   ├── app/
│   │   ├── api/productos/     # API REST
│   │   ├── productos/[id]/    # Vista detalle
│   │   ├── layout.tsx         # Layout principal
│   │   └── page.tsx           # Página home
│   ├── components/
│   │   ├── charts/            # 5 tipos de gráficos
│   │   ├── Dashboard.tsx      # Componente principal
│   │   ├── Filters.tsx        # Filtros dinámicos
│   │   ├── ProductTable.tsx   # Tabla de productos
│   │   └── CreateProduct.tsx  # Modal crear producto
│   ├── store/
│   │   ├── slices/            # Redux slices
│   │   └── store.ts           # Configuración Redux
│   └── lib/
│       └── prisma.ts          # Cliente Prisma
└── package.json
```

---

## 🚀 Instalación y Configuración

### **Requisitos Previos**
- **Node.js 20.9.0 o superior** ([Descargar aquí](https://nodejs.org/))
- npm (incluido con Node.js)
- Git

> **Verificar versión de Node:** `node --version`

### **Paso 1: Clonar el Repositorio**

```bash
git clone [URL_DEL_REPOSITORIO]
cd Taller_3_web/dashboard_mobile
```

### **Paso 2: Instalar Dependencias**

```bash
npm install
```

**⚠️ Si aparecen errores de dependencias:**
```bash
npm install --legacy-peer-deps
```

> **Nota:** La instalación puede tardar 2-3 minutos dependiendo de tu conexión

### **Paso 3: Configurar Variables de Entorno**

**El proyecto ya incluye un archivo `.env` configurado con la base de datos compartida.**

✅ **No necesitas hacer nada adicional**, la base de datos ya está configurada y lista para usar.

> **📌 Nota Importante:** La base de datos es compartida entre todos los integrantes del grupo. Los cambios que hagas (crear/editar/eliminar productos) serán visibles para todos.

<details>
<summary>🔧 <b>Opcional:</b> Usar tu propia base de datos</summary>

Si prefieres usar tu propia base de datos PostgreSQL:

1. Crea un archivo `.env` (o modifica el existente):
```env
DATABASE_URL="postgresql://usuario:contraseña@host/nombre_bd?sslmode=require"
```

2. Servicios recomendados para BD gratuita:
   - [Neon](https://neon.tech/) (Recomendado)
   - [Supabase](https://supabase.com/)
   - [Railway](https://railway.app/)

3. Ejecuta la configuración:
```bash
npm run db:setup
```

</details>

### **Paso 4: Configurar la Base de Datos**

Ejecutar UN SOLO comando que hace todo:

```bash
npm run db:setup
```

Este comando automáticamente:
- ✅ Genera el cliente Prisma
- ✅ Ejecuta las migraciones de la BD
- ✅ Crea 50 productos de prueba

**Verificar que funcionó:**
```bash
npm run db:studio
```
Esto abrirá Prisma Studio en tu navegador donde podrás ver los 50 productos creados.

<details>
<summary>⚙️ <b>Alternativa:</b> Ejecutar comandos por separado</summary>

Si prefieres ejecutar cada paso manualmente:

```bash
# 1. Generar cliente Prisma
npm run db:generate

# 2. Ejecutar migraciones
npm run db:migrate

# 3. Poblar con datos de prueba
npm run db:seed
```

</details>

### **Paso 5: Iniciar el Servidor de Desarrollo**

```bash
npm run dev
```

La aplicación estará disponible en: **http://localhost:3000**

---

## 📱 Funcionalidades Principales

### **1. Dashboard Principal**
- Métricas generales (total productos, ventas, stock, precio promedio)
- 5 gráficos interactivos:
  - **Barra:** Productos por categoría
  - **Línea:** Ventas por categoría
  - **Torta:** Estado activo/inactivo
  - **Área:** Stock por categoría
  - **Radar:** Rating promedio por categoría

### **2. Gestión de Productos**
- ✅ **Crear** nuevos productos
- 👁️ **Ver** detalles completos
- ✏️ **Editar** información
- 🗑️ **Eliminar** productos

### **3. Filtros Dinámicos (con persistencia)**
- Filtrar por categoría
- Rango de precio (mín/máx)
- Stock mínimo
- Solo productos activos
- Ordenar por: nombre, precio, ventas, rating
- Dirección: ascendente/descendente

### **4. Vista Detallada**
- Información completa del producto
- Estadísticas calculadas
- Acciones CRUD

---

## 🎨 Diseño Responsivo

La aplicación se adapta a:
- 📱 **Móviles** (< 768px): Cards y menús colapsables
- 📱 **Tablets** (768px - 1024px): Layout intermedio
- 💻 **Desktop** (> 1024px): Tabla completa y gráficos expandidos

---

## 🔗 API Endpoints

### **Productos**

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| `GET` | `/api/productos` | Listar todos (con filtros) |
| `POST` | `/api/productos` | Crear producto |
| `GET` | `/api/productos/[id]` | Obtener uno |
| `PUT` | `/api/productos/[id]` | Actualizar |
| `DELETE` | `/api/productos/[id]` | Eliminar |

### **Ejemplo de Filtros:**
```
GET /api/productos?categoria=Electrónica&precioMin=100&precioMax=500&ordenPor=ventas&ordenDireccion=desc
```

---

## 📊 Modelo de Datos

```prisma
model Producto {
  id          String   @id @default(uuid())
  nombre      String
  categoria   String
  precio      Float
  stock       Int
  ventas      Int      @default(0)
  rating      Float    @default(0)
  fechaCreado DateTime @default(now())
  activo      Boolean  @default(true)
}
```

---

## 🧪 Scripts Disponibles

```bash
# Desarrollo
npm run dev              # Iniciar servidor desarrollo

# Base de Datos
npm run db:generate      # Generar cliente Prisma
npm run db:migrate       # Ejecutar migraciones
npm run db:seed          # Poblar con datos de prueba
npm run db:studio        # Abrir Prisma Studio
npm run db:setup         # Ejecutar todo (generate + migrate + seed)

# Producción
npm run build            # Compilar para producción
npm run start            # Iniciar en producción
```

---

## ⚠️ Solución de Problemas Comunes

### **Error: "Cannot find module '@prisma/client'"**
```bash
npm run db:generate
```

### **Error: "Port 3000 already in use"**
Cambiar el puerto:
```bash
# Windows
set PORT=3001 && npm run dev

# Mac/Linux
PORT=3001 npm run dev
```

### **Error de conexión a la base de datos**
1. Verificar conexión a internet (la BD está en Neon cloud)
2. Revisar que el `DATABASE_URL` en `.env` esté correcto
3. Ejecutar nuevamente: `npm run db:setup`

### **Los filtros no persisten al recargar**
- Verificar que localStorage esté habilitado en el navegador
- Abrir DevTools (F12) → Console y buscar errores

### **La página no carga / Pantalla en blanco**
1. Verificar que Node.js sea versión 20.9+: `node --version`
2. Limpiar cache y reinstalar:
```bash
rm -rf node_modules package-lock.json .next
npm install
npm run dev
```

### **Error: "peer dependency warnings"**
Es normal, no afecta el funcionamiento. Si prefieres eliminarlos:
```bash
npm install --legacy-peer-deps
```

### **No aparecen productos en el dashboard**
Ejecutar nuevamente el seed:
```bash
npm run db:seed
```

---

## 📚 Recursos Adicionales

- [Documentación Next.js](https://nextjs.org/docs)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [Prisma ORM](https://www.prisma.io/docs)
- [Chart.js](https://www.chartjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)

---

## 📄 Licencia

Este proyecto fue desarrollado como parte del Taller N°3 de Desarrollo Web Móvil - UCN 2025.

---

## 📧 Contacto

**Profesores:**
- Cristhian Rabi - cristhian.rabi@ce.ucn.cl
- Valentina Henríquez - valentina.henriquez@ce.ucn.cl

**Fecha de Entrega:** 12/12/2025