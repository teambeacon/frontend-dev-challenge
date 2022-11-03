import style from '../styles/Home.module.css'
import React, {useState, useEffect} from 'react'
import Logo from "../assets/logo"
import Search from "../assets/search"

const beaconApi = "https://api.sendbeacon.com/team/schools/"


export default function Home() {
  const [schools, setSchools] = useState([]);
  const [search, setSearch] = useState("");
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [status, setStatus] = useState(null);

  useEffect(() => {
    getLocation()
    fetch(`${beaconApi}`)
    .then((response) => response.json())
    .then((schools) => setSchools(schools["schools"]))
  },[])

  // const successCallBack = (position) => {
  //   console.log(position);
  // }

  // const errorCallBack = (error) => {
  //   console.log(error);
  // }

  const getLocation = () => {
    if (!navigator.geolocation) {
      setStatus('Geolocation is not supported by your browser');
    } else {
      setStatus('Locating...');
      navigator.geolocation.getCurrentPosition((position) => {
        setStatus(null);
        setLat(position.coords.latitude);
        setLng(position.coords.longitude);
      }, () => {
        setStatus('Unable to retrieve your location');
      });
    }
  }
  function getDistance(xA, yA, xB, yB) { 
    var xDiff:Number = xA - xB; 
    var yDiff:Number = yA - yB; 
  
    return Math.sqrt(xDiff * xDiff + yDiff * yDiff);
  }
  
  let distance = getDistance(0, 0, 100, 100);
  console.log(distance)


  const handleOnChange = (e) => {
    setSearch(e.target.value)
  }
 
  const filteredDisplay = schools.filter((school) => {
    return school.name.toLowerCase().includes(search.toLowerCase());
  })


 
  const renderSchoolList = filteredDisplay.map((school) =>{
    let initial = school.name.slice(0,1);

    return <div key={school.id}>
      <div>{school.name}</div>
      <div>{school.county}</div>
      <div>{initial}</div>
    </div>
  })
  

  return (
    <>
    <div >
      <p>{status}</p>
      {lat && <p>Latitude: {lat}</p>}
      {lng && <p>Longitude: {lng}</p>}
    </div>
    <nav>
      <div className='nav-center'>
        <div className='nav-header'>
          <Logo/>
         
        </div>
      </div>
      </nav>
    <div>
    <Search/>
    <input type="text" placeholder='search' onChange={handleOnChange} value={search}/>
    </div>
     <div>{renderSchoolList}</div>
    </>
   
  )
}
