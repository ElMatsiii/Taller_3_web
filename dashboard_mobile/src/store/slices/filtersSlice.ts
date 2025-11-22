import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface FiltersState {
  categoria: string
  precioMin: number
  precioMax: number
  stockMin: number
  soloActivos: boolean
  ordenPor: 'nombre' | 'precio' | 'ventas' | 'rating'
  ordenDireccion: 'asc' | 'desc'
}

const initialState: FiltersState = {
  categoria: 'todas',
  precioMin: 0,
  precioMax: 10000,
  stockMin: 0,
  soloActivos: false,
  ordenPor: 'nombre',
  ordenDireccion: 'asc',
}

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setCategoria: (state, action: PayloadAction<string>) => {
      state.categoria = action.payload
    },
    setPrecioMin: (state, action: PayloadAction<number>) => {
      state.precioMin = action.payload
    },
    setPrecioMax: (state, action: PayloadAction<number>) => {
      state.precioMax = action.payload
    },
    setStockMin: (state, action: PayloadAction<number>) => {
      state.stockMin = action.payload
    },
    setSoloActivos: (state, action: PayloadAction<boolean>) => {
      state.soloActivos = action.payload
    },
    setOrdenPor: (
      state,
      action: PayloadAction<'nombre' | 'precio' | 'ventas' | 'rating'>
    ) => {
      state.ordenPor = action.payload
    },
    setOrdenDireccion: (state, action: PayloadAction<'asc' | 'desc'>) => {
      state.ordenDireccion = action.payload
    },
    resetFilters: (state) => {
      return initialState
    },
  },
})

export const {
  setCategoria,
  setPrecioMin,
  setPrecioMax,
  setStockMin,
  setSoloActivos,
  setOrdenPor,
  setOrdenDireccion,
  resetFilters,
} = filtersSlice.actions

export default filtersSlice.reducer