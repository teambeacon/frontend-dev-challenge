import styles from '../styles/Home.module.css'
import { useSelector, useDispatch } from 'react-redux'
import { searchChange } from '../features/search/searchSlice'
import { RootState } from '../features/store'
import { schoolApi } from '../features/services/schoolApi'
import { useGeolocated } from "react-geolocated";
import { getDistance } from 'geolib';
import { useState, useEffect } from 'react'
import { Container, Stack, Row, Button, Col } from 'react-bootstrap'

const {data: _schools} = schoolApi.useGetSchoolsQuery("Schools")
const schools = _schools?.schools

interface SchoolData {
  id: string,
  name: string,
  type: string,
  zipCode: string,
  enrolled: number,
  applicants: number,
  admitted: number,
  tuition: number,
  highestDegree: string,
  county: string,
  state: string,
  coordinates: {
    lat: number,
    long: number,
  }
}


const initialSchools = schools?.map((school: SchoolData) => {
  return [ school.name, school.coordinates.lat, school.coordinates.long ]
}).sort()


const SchoolList: React.FC<SchoolData> = ({ initialSchools }) => {
  return (

    <>
    {initialSchools.map(school: [] => 
      <SchoolCell name={school[0]}/>)}
    </>

  );
};

const SchoolCell = ({ name:string }) => {

const searchTerms = useSelector((state: RootState) => state.searchfield.searchText)
const dispatch = useDispatch()

  return (
    <Container className={styles.schoolCard}>
      <Row className="h-100">
        <Col xs={1} className={styles.schoolBadge}>
          <div className={styles.schoolInitial}>S</div>
        </Col>
        <Col
          xs={10}
          className="h-100 d-flex flex-column justify-content-center text-start"
        >
          <h5 className="my-0 py-0 fw-bolder">{name}</h5>
          <p className="fw-normal fs-6 my-0 py-0">Madison</p>
        </Col>
      </Row>
    </Container>
  )
}


const Searchbar = () => {
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
        />
      </form>
    </div>
  );
};





export default function Home() {
  const [latitude, setLatitude] = useState<number | undefined>()
  const [longitude, setLongitude] = useState<number | undefined>()

  const { coords, isGeolocationAvailable, isGeolocationEnabled } =
        useGeolocated({
            positionOptions: {
                enableHighAccuracy: false,
            },
            userDecisionTimeout: 5000,
        });
  
  useEffect(() => {
    if (coords) {
      setLatitude(coords.latitude)
      setLongitude(coords.longitude)
    }
  }, [coords])
  




  const currentLatitude: number | undefined = coords?.latitude
  const currentLongitude: number | undefined = coords?.longitude

  // const calculateDistance = () => {
  //     if (currentLatitude && currentLongitude != undefined) {
  //       initialSchools?.map((school: any,) => 
  //       getDistance(
  //       { latitude: currentLatitude, longitude: currentLongitude },
  //       { latitude: school?.coordinates?.lat, longitude: school?.coordinates?.long })

  //       );
  //     } else {
  //       return "nada"
  //     }
  //   }
  // console.log(calculateDistance(), "test")

// const log = () => {
//   if (currentLatitude && currentLongitude != undefined)
//   initialSchools?.forEach((x: any) => { 
//     return getDistance(
//     { lat: currentLatitude, lon: currentLongitude },
//     { lat: x?.coordinates?.lat, lon: x.coordinates?.long })
//   })
//   }
// log()

  const filteredSchools = initialSchools?.filter((school : any) => school[0].toLowerCase().includes(searchTerms.toLowerCase()))
  console.log(initialSchools, "initial", typeof searchTerms)
  return (
  
  <div className={styles.body}>
    <Container className={styles.main}>
      {/* <input type="text" name="name" onChange={(e) => dispatch(searchChange(e.target.value))} /> */}
      <Searchbar className={styles.search} />
      <Stack gap={2} className={styles.schoolList}>
        <SchoolList initialSchools={initialSchools} />
      </Stack>
    </Container>
  </div>
  )
}


