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

const loadFiltersFromStorage = (): FiltersState => {
  if (typeof window === 'undefined') return initialState
  
  try {
    const saved = localStorage.getItem('dashboard-filters')
    if (saved) {
      return { ...initialState, ...JSON.parse(saved) }
    }
  } catch (error) {
    console.error('Error loading filters:', error)
  }
  return initialState
}

const saveFiltersToStorage = (state: FiltersState) => {
  if (typeof window === 'undefined') return
  
  try {
    localStorage.setItem('dashboard-filters', JSON.stringify(state))
  } catch (error) {
    console.error('Error saving filters:', error)
  }
}

const filtersSlice = createSlice({
  name: 'filters',
  initialState: loadFiltersFromStorage(),
  reducers: {
    setCategoria: (state, action: PayloadAction<string>) => {
      state.categoria = action.payload
      saveFiltersToStorage(state)
    },
    setPrecioMin: (state, action: PayloadAction<number>) => {
      state.precioMin = action.payload
      saveFiltersToStorage(state)
    },
    setPrecioMax: (state, action: PayloadAction<number>) => {
      state.precioMax = action.payload
      saveFiltersToStorage(state)
    },
    setStockMin: (state, action: PayloadAction<number>) => {
      state.stockMin = action.payload
      saveFiltersToStorage(state)
    },
    setSoloActivos: (state, action: PayloadAction<boolean>) => {
      state.soloActivos = action.payload
      saveFiltersToStorage(state)
    },
    setOrdenPor: (
      state,
      action: PayloadAction<'nombre' | 'precio' | 'ventas' | 'rating'>
    ) => {
      state.ordenPor = action.payload
      saveFiltersToStorage(state)
    },
    setOrdenDireccion: (state, action: PayloadAction<'asc' | 'desc'>) => {
      state.ordenDireccion = action.payload
      saveFiltersToStorage(state)
    },
    resetFilters: (state) => {
      Object.assign(state, initialState)
      if (typeof window !== 'undefined') {
        localStorage.removeItem('dashboard-filters')
      }
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