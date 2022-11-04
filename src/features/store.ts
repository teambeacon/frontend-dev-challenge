import { configureStore } from '@reduxjs/toolkit'
import searchReducer from '../features/search/searchSlice'
import { schoolApi } from './services/schoolApi'

export const store = configureStore({
  reducer: {
    [schoolApi.reducerPath]: schoolApi.reducer,
    searchfield: searchReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(schoolApi.middleware)
})



// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch