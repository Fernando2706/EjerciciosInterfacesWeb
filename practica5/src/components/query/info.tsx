import React, {useState, FC} from 'react';
import ClipLoader from "react-spinners/ClipLoader";
import { gql, useQuery } from "@apollo/client"
import './info.css'
const City = gql`
  query getCity($name :String!){
      cities(where: {name: {eq: $name}}) {
        name
        population
        country {
          name
        }
        timeZone {
          name
        }
      }
  }
`
interface CityProps{
  name: string,
  changeFilter: Function,

}

interface ICity{
  cities: Array<{
    name: string,
    population: number,
    country: {
      name:string
    }
    timeZone: {
      name:string
    }
  }>
}

const InfoCity: FC<CityProps>= (props) => {
  const {data,loading,error} = useQuery<ICity>(City,{variables:{name:props.name}})
  const [index, setIndex] = useState<number>(-1);
  
  return (
    <div className="container_global">
      {loading&& <ClipLoader color="blue"/>}
      {error && <div>{error.message}</div>}
      {data && data.cities.map((city, index_city) => {
        if (index === index_city) {
          return (
            <div className="container_info" >
              <div className="name no" onClick={() => {
                setIndex(index)
              }}>{city.name}</div>
              <div className="args country" onClick={() => {
                props.changeFilter(city.country.name,true)
              }}>Country: { city.country.name}</div>
              <div className="args">Population: { city.population}</div>
              {city.timeZone&&<div className="args">TimeZone: { city.timeZone.name}</div>}
            </div>
          )
        } else {
          return (
            <div className="container_info" >
              <div className="name" onClick={() => {
                setIndex(index_city)
              }}>{city.name}</div>
              </div>
          )
        }
      })}
    </div>
  )
}


export default InfoCity;