import React, { useState, useEffect } from 'react'
import styles from '../styles/Home.module.css'
import Image from 'next/image'


export default function Home() {
  const api_url = 'https://api.sendbeacon.com/team/schools';
  const [schools, setSchools] = useState([]);
  const [location, setLocation] = useState(false);
  const [userLocation, setUserLocation] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const [hoveredSchool, setHoveredSchool] = useState(null);



  return (
    <div></div>
  )
}
