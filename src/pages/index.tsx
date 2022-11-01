import styles from '../styles/Home.module.css'
import React, {useState, useEffect} from 'react'
const beaconApi = "https://api.sendbeacon.com/team/schools/"


export default function Home() {
  const [schools, setSchools] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch(`${beaconApi}`)
    .then((response) => response.json())
    .then((schools) => setSchools(schools["schools"]))
  },[])

  const handleOnChange = (e) => {
    setSearch(e.target.value)
  }
 
  const filteredDisplay = schools.filter((school) => {
    return school.name.toLowerCase().includes(search.toLowerCase());
  })

  const schoolDisplay = filteredDisplay.map((school) =>{
    let initial = school.name.slice(0,1);

    return <div key={school.id}>
      <div>{school.name}</div>
      <div>{school.county}</div>
      <div>{initial}</div>
    </div>
  })
  

  return (
    <>
    <div>NAV</div>
    <div>
      <input type="text" placeholder='search' onChange={handleOnChange} value={search} />
    </div>
     <div>{schoolDisplay}</div>
    </>
   
  )
}
