import React from 'react'
import type { RootState } from '../features/store'
import { useSelector, useDispatch } from 'react-redux'
import { searchChange } from '../features/search/searchSlice'

const Searchbar = () => {
  const searchTerm = useSelector((state: RootState) => state.searchfield.value)
  return (
    <div>Searchbar</div>
  )
}

export default Searchbar