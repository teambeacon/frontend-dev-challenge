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

  const success = (position: GeolocationPosition) => {
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

  const error = (err: GeolocationPositionError) => {
    console.warn(`ERROR(${err.code}): ${err.message}`);

    setLocation(false);
  }

  const options = {
    enableHighAccuracy: true, // Will use GPS if available
    timeout: 5000, // Timeout after 5 seconds
    maximumAge: 0 // Disable cache - always get fresh position
  };


  const distance = (lat1: number, lon1: number, lat2: number, lon2: number, unit: string) => {

    if ((lat1 == lat2) && (lon1 == lon2)) {
      return 0;
    } else {
      const radlat1 = Math.PI * lat1 / 180;
      const radlat2 = Math.PI * lat2 / 180;
      const theta = lon1 - lon2;
      const radtheta = Math.PI * theta / 180;

      let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);

      if (dist > 1) dist = 1;

      dist = Math.acos(dist);
      dist = dist * 180 / Math.PI;
      dist = dist * 60 * 1.1515;
      if (unit == "K") { dist = dist * 1.609344 }
      if (unit == "N") { dist = dist * 0.8684 }
      return dist;
    }
  }


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
