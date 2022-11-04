import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// export interface schoolInterface {
//     "id": string
//     "name": string
//     "type": string
//     "zipCode": string
//     "enrolled": number,
//     "applicants": number,
//     "admitted": number,
//     "tuition": number,
//     "highestDegree": string
//     "county": string
//     "state": string
//     "coordinates": {
//         "lat": number,
//         "long": number
//     }
// }

export const schoolApi = createApi({
  reducerPath: 'schoolApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.sendbeacon.com/team'}),
  tagTypes: ["Schools"],
  endpoints: (builder) => ({
    getSchools: builder.query({
      query: () => 'schools',
    })
  })
})

export const { useGetSchoolsQuery } = schoolApi