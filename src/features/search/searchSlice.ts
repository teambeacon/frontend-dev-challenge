import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface SearchState {
    searchText: string
  }
  
  const initialState: SearchState = {
    searchText: '',
  }

export const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        searchChange: (state, action) => {
            state.searchText = action.payload
        }
    }
})

export const { searchChange } = searchSlice.actions

export default searchSlice.reducer