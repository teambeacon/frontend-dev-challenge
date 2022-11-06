import styles from '../styles/Home.module.css'
import { useSelector, useDispatch } from 'react-redux'
import Searchbar from '../components/Searchbar'
import { searchChange } from '../features/search/searchSlice'
import { RootState } from '../features/store'
import { schoolApi } from '../features/services/schoolApi'
import { useGeolocated } from "react-geolocated";
import { getDistance } from 'geolib';
import { useState, useEffect } from 'react'
import { Container, Stack, Row, Button, Col } from 'react-bootstrap'

// Interface for a singular school object

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

// Interface for the data displayed in each shcool cell

interface DisplayedSchoolData {
  distance?: number,
  name: string,
  county: string,
  coordinates: {
    lat: number
    long: number
  }
}

//Main Component 

const Home: React.FC = ({ }) => {

  // Latitude + Longitude = state from geoLocated hook, serves as user's curent location 
  const [latitude, setLatitude] = useState<number>(0)
  const [longitude, setLongitude] = useState<number>(0)

  // Using Redux Toolkit Query, the school data is fetched, flattened via saving to a variable, and the search terms
  // typed into the searchbar component are saved to the Redux store as well

  const { data: _schools, isSuccess } = schoolApi.useGetSchoolsQuery("schools")

  const schools = _schools?.schools

  const searchTerms = useSelector((state: RootState) => state.searchfield.searchText)

  // currentSchools = a state object containing the currently displayed schools. This varied depending 
  // on whether location data is available or not. If unavailable, schools sorted by name (initialSchools). If available,
  // sorted by proximity (schoolsByDistance). If there's characters typed into the search bar, then the object is filtered by 
  // the query (filteredSchools)

  const [currentSchools, setCurrentSchools] = useState<DisplayedSchoolData[]>()

  const initialSchools: (DisplayedSchoolData[] | undefined) = schools?.map((school: SchoolData) => {
    return ({ name: school.name, county: school.county, coordinates: { lat: school.coordinates.lat, long: school.coordinates.long } })
  }).sort((a, b) => (a.name > b.name) ? 1 : -1)

  const filteredSchools: (DisplayedSchoolData[] | undefined) = currentSchools?.filter((school: DisplayedSchoolData) => school.name.toLowerCase().includes(searchTerms.toLowerCase()))

  const schoolsByDistance: (DisplayedSchoolData[] | undefined) = initialSchools?.map((school: DisplayedSchoolData) => ({
    ...school, distance: getDistance({ latitude: latitude, longitude: longitude },
      { latitude: school?.coordinates?.lat, longitude: school?.coordinates?.long })
  })).sort((a: DisplayedSchoolData, b: DisplayedSchoolData) => (b.distance ? b.distance : 0) - (a.distance ? a.distance : 0))

  // coords = user location data

  const { coords } =
    useGeolocated({
      positionOptions: {
        enableHighAccuracy: true,
        maximumAge: 5000
      },
      watchPosition: true,
      userDecisionTimeout: 5000,
    })


  // Two useEffect hooks to ensure: 
  // 1) as soon as data fetching is successful, state is updated with initialSchools 
  // 2) coords are set to state as soon as they are available, and once availalbe schools are sorted by distance

  useEffect(() => {
    if (isSuccess)
      setCurrentSchools(initialSchools)
    console.log(coords, "sorting by name")
  }, [isSuccess])

  useEffect(() => {

    if (coords) {
      setLatitude(coords?.latitude)
      setLongitude(coords?.longitude)
      setCurrentSchools(schoolsByDistance)
    }

  }, [coords])





  // This component controls rendering of the school data into cells

  const SchoolList = () => {
    return (

      <>
        <Stack gap={2} className={styles.schoolList}>
          {searchTerms ? filteredSchools?.map((school: DisplayedSchoolData) =>
            <SchoolCell name={school.name} coords={school.coordinates} county={school.county} />)
            : currentSchools?.map((school: DisplayedSchoolData) =>
              <SchoolCell name={school.name} coords={school.coordinates} county={school.county} />)}
        </Stack>
      </>

    );
  };


  // This component containes each individual school

  const SchoolCell = ({ name, coords, county }: { name: DisplayedSchoolData["name"], coords: DisplayedSchoolData["coordinates"], county: DisplayedSchoolData["county"] }) => {


    return (
      <Container className={styles.schoolCard}>
        <Row className="h-100">
          <Col xs={1} className={styles.schoolBadge}>
            <button className={styles.schoolInitial}>{name[0]}</button>
          </Col>
          <Col
            xs={10}
            className="h-100 d-flex flex-column justify-content-center text-start"
          >
            <h5 className="my-0 py-0 fw-bolder">{name}</h5>
            <p className="fw-normal fs-6 my-0 py-0">{county.split(" ", 1)}</p>
          </Col>
        </Row>
      </Container>
    )
  }

  // Main layout for the app

  return (

    <div className={styles.body}>
      <Container className={styles.main}>
        <Searchbar />
        <SchoolList />
      </Container>
    </div>
  )
}

export default Home


