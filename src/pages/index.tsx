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

  const success = (position) => {
    const crd = position.coords;

    console.log('Your current position is:');
    console.log(`Latitude : ${crd.latitude}`);
    console.log(`Longitude: ${crd.longitude}`);
    console.log(`Roughly ${crd.accuracy} meters.`);

    setUserLocation({
      lat: crd.latitude,
      lng: crd.longitude
    });

    setLocation(true);
  }

  const error = (err) => {
    console.warn(`ERROR(${err.code}): ${err.message}`);

    setLocation(false);
  }

  const options = {
    enableHighAccuracy: true, // Will use GPS if available
    timeout: 5000, // Timeout after 5 seconds
    maximumAge: 0 // Disable cache - always get fresh position
  };







  useEffect(() => {
    getSchools();
    navigator.geolocation.getCurrentPosition(success, error, options);
    // Empty dependency array so the function only runs once
  }, []);








  return (
    <div className={styles.body}>

    </div>
  )
}
