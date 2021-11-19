import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import type { RootState, StoreDispatch } from './store/configureStore'

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<StoreDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector