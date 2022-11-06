import React from 'react'
import type { RootState } from '../features/store'
import { useSelector, useDispatch } from 'react-redux'
import { searchChange } from '../features/search/searchSlice'
import styles from '../styles/Home.module.css'


const Searchbar = () => {

  const dispatch = useDispatch()

  const searchIcon = (
    <svg
      width="25"
      height="25"
      viewBox="0 0 18 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="me-1"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M13 7.5C13 10.5376 10.5376 13 7.5 13C4.46243 13 2 10.5376 2 7.5C2 4.46243 4.46243 2 7.5 2C10.5376 2 13 4.46243 13 7.5ZM12.0241 13.4824C10.7665 14.4349 9.19924 15 7.5 15C3.35786 15 0 11.6421 0 7.5C0 3.35786 3.35786 0 7.5 0C11.6421 0 15 3.35786 15 7.5C15 9.22183 14.4198 10.8081 13.4442 12.0741L17.6743 16.3042C18.0648 16.6947 18.0648 17.3279 17.6743 17.7184C17.2838 18.1089 16.6506 18.1089 16.2601 17.7184L12.0241 13.4824Z"
        fill="#6023E5"
      />
    </svg>
  );

  return (
    <div className={styles.search}>
      <h2 className="fs-1 fw-bold text-white text-center mb-5">
        Pick Your School
      </h2>
      <form className="d-flex align-items-center border-bottom border-2 border-secondary mb-2 pb-2">
        {searchIcon}
        <input
          type="text"
          id="school"
          name="school"
          className={styles.searchbar}
          placeholder="Search for your school...."
          onChange={(e) => dispatch(searchChange(e.target.value))}
        />
      </form>
    </div>
  );
};

export default Searchbar