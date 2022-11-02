import style from '../styles/Home.module.css'
import React, {useState, useEffect} from 'react'
import Logo from "../assets/logo"
import Search from "../assets/search"
//create a variable initialzed with API addresse
const beaconApi = "https://api.sendbeacon.com/team/schools/"


export default function Home() {

  //create internal state called schools for our component with an initial value of an empty array
  const [schools, setSchools] = useState([]);
  //create useState for search with an initial value of empty string
  const [search, setSearch] = useState("");
   //create useState for latitude information with an initial value of null
  const [lat, setLat] = useState(null);
   //create useState for Longitude information with an initial value of null
  const [lng, setLng] = useState(null);
   //create useState for user location information on with an initial value of false
  const [locationOn, setLocationOn] = useState(false);
   //create useState for status message for location information with an initial value of null
  const [status, setStatus] = useState(null);
  
  //getting school information from an API and User Location using useEffect
  useEffect(() => {
    // firing getLocation(), getSchools() function to get User Location and school information
    getLocation();
    getSchools()
  },[])

  //getting school information from an API using fetch GET request
  const getSchools = () => 
    fetch(`${beaconApi}`)
    //getting HTTP response from API and turn it into JSON format
    .then((response) => response.json())
    //getting school infomation in JSON format
    .then((schools) => {
      //checking User's location setting and update schools useState with the data accordingly 
      if (locationOn){
        //iterate throughschool data by using .map and return a new array of objects with school data and distance information caculated from current User's location added
        const schoolsWithDistance = schools["schools"].map((school) => {
          let distance = getDistance(123.444, 12.3, school.coordinates.lat, school.coordinates.long)
          return {...school, distance: distance}
        }) 
        //sort schools by distance and update school useState with the sorted data
        const sortedSchoolsByDistance = schoolsWithDistance.sort((a,b) => parseFloat(a.distance) - parseFloat(b.distance))
        setSchools(sortedSchoolsByDistance)
      } else {
        // sort schools by alphabetically and update school useState with the sorted data when User location is off
        const sortedSchoolsByName = schools["schools"].sort((a,b) => a.name.localeCompare(b.name))
        setSchools(sortedSchoolsByName)
      }
    })
  
  // getting User location information using Geolocation API
  const getLocation = () => {
    //if browser does not support Geolocation then set status message to "not supported" and set LocationOn to false 
    if (!navigator.geolocation) {
      setStatus('Geolocation is not supported by your browser');
      setLocationOn(false)
    } else {
      //browser supports Geolocation then get location information and update latitude and longitude state with the information
      setStatus("locating...")
      navigator.geolocation.getCurrentPosition((position) => {
        setStatus(null);
        setLocationOn(true)
        setLat(position.coords.latitude);
        setLng(position.coords.longitude);
      }, () => {
        setStatus('Unable to retrieve your location');
      });
    }
  }

  //create a function to calculate the distance between two coordinates
  const getDistance = (xA, yA, xB, yB) => {
    
    let xDiff = xA - xB; //calculate the difference between two coordinates
    let yDiff = yA - yB; //calculate the difference between two coordinates

    return Math.sqrt(xDiff * xDiff + yDiff * yDiff); //return the distance between two coordinates
  }

  //function to handleOnChange when search input value changes
  const handleOnChange = (e) => {
    //update search state with search input value
    setSearch(e.target.value)
  }

  //filter schools where schools' name mataches with the user search input value
  const filteredSchoolLists = schools.filter((school) => {
    return school.name.toLowerCase().includes(search.toLowerCase());
  })

  //renderSchoolLists using .map on filteredSchoolLists
  const renderSchoolList = filteredSchoolLists.map((school) =>{
    let initial = school.name.slice(0,1);

    return <div key={school.id}>
      <div>{school.name}</div>
      <div>{school.county}</div>
      <div>{initial}</div>
    </div>
  })
  

  return (
    <div className={style.home} >
    <div >
      <p>{status}</p>
      {lat && <p>Latitude: {lat}</p>}
      {lng && <p>Longitude: {lng}</p>}
    </div>
    <nav>
      <div className='nav-center'>
        <div className='nav-header'>
          <Logo/>
         <h2>nav</h2> 
        </div>
      </div>
      </nav>
    <div>
    <Search/>
    <input type="text" placeholder='search' onChange={handleOnChange} value={search}/>
    </div>
     <div>{renderSchoolList}</div>
    </div>
   
  )
}
