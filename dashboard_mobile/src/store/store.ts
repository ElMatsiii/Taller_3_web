import { configureStore } from '@reduxjs/toolkit'
import productReducer from './slices/productSlice'
import filtersReducer from './slices/filtersSlice'

export const store = configureStore({
  reducer: {
    products: productReducer,
    filters: filtersReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch