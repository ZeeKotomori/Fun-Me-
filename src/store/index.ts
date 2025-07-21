import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import downvoteReducer from './downvoteSlice'
import upvoteReducer from './upvoteSlice'

export const store = configureStore({
    reducer: {
        upvotes: upvoteReducer,
        downvotes : downvoteReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
