import { useState, useEffect } from 'react'
import styles from '../styles/Home.module.css'
import Image from 'next/image'


export default function Home() {
  const api_url = 'https://api.sendbeacon.com/team/schools';
  const [schools, setSchools] = useState([]);
  const [location, setLocation] = useState(false);
  const [userLocation, setUserLocation] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const [hoveredSchool, setHoveredSchool] = useState(null);


  const getSchools = async () => {
    const response = await fetch(api_url);
    const data = await response.json();
    setSchools(data);
  }

  useEffect(() => {
    getSchools();
    // Empty dependency array so the function only runs once
  }, []);






  return (
    <div className={styles.body}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>
            <span className={styles.titleText}>Pick Your School</span>
          </h1>
          <form className={styles.search}>
            <button type='submit' className={styles.searchButton}>
              <Image src='/search.svg' alt='Search' width={20} height={20} />
            </button>
            <input
              type='text'
              placeholder='Search for your school...'
              className={styles.searchInput}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>
          <div className={styles.location}>
          </div>
        </div>
        <div className={styles.schools}>
          {schools
            .filter((school) => {
              if (searchQuery === '') return true;
              if (school.name.toLowerCase().includes(searchQuery.toLowerCase())) {
                return true;
              }
              return false;
            }
            )
          }
        </div>
      </div>
    </div>
  )
}
