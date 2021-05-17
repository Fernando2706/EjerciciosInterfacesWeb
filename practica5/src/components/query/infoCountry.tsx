import React, { useState, FC, useEffect } from 'react';
import ClipLoader from "react-spinners/ClipLoader";
import { gql, useQuery } from "@apollo/client"
import './infoCountry.css'
import axios from 'axios';


const Country = gql`
  query getCountry($name :String!){
    countries(where: {name: {eq: $name}}) {
      continent {
        name
      }
      currencies {
        name
      }
      population
      languages {
        name
      }
      capital {
        name
        location {
          lat
          long
        }
      }
      name
      alpha2Code
      
    }
  }
    
  
`

interface CountryProps {
  name: string
  changeFilter: Function,
}

interface ICountry {
  countries: Array<{
    continent: {
      name: string
    },
    capital: {
      name: string,
      location: {
        lat: number,
        long: number
      }
    },
    currencies: Array<{
      name: string
    }>,
    population: number,
    languages: Array<{
      name: string
    }>,
    name: string,
    alpha2Code: string,

  }>
}

interface WeatherAPI {
  coord: Coord;
  weather: Weather[];
  base: string;
  main: Main;
  visibility: number;
  wind: Wind;
  clouds: Clouds;
  dt: number;
  sys: Sys;
  timezone: number;
  id: number;
  name: string;
  cod: number;
}

interface Clouds {
  all: number;
}

interface Coord {
  lon: number;
  lat: number;
}

interface Main {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
}

interface Sys {
  type: number;
  id: number;
  country: string;
  sunrise: number;
  sunset: number;
}

interface Weather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

interface Wind {
  speed: number;
  deg: number;
}



const InfoCountry: FC<CountryProps> = (props) => {

  const { data, loading, error } = useQuery<ICountry>(Country, { variables: { name: props.name } })
  const [index, setIndex] = useState<number>(-1);

  const [dataWeather, setData] = useState<WeatherAPI>();

  useEffect(() => {
    if (index !== -1) {
      axios.get("https://api.openweathermap.org/data/2.5/weather?lat=" + data?.countries[index].capital.location.lat + "&lon=" + data?.countries[index].capital.location.long + "&appid=" + process.env.REACT_APP_KEY).then((results) => {
        setData(results.data);
        console.log(results.data);

      })
    }

  }, [index]);

  return (
    <div className="container_global_country">
      {loading && <ClipLoader color="blue" />}
      {error && <div>{error.message}</div>}
      {data && data.countries.map((country, index_country) => {
        if (index === index_country) {
          return (
            <div className="container_info_country" >
              <div className="name_country no" onClick={() => {
                setIndex(index);

              }}>{country.name}</div>
              <div className="args_country">Continent: {country.continent.name}</div>
              <div className="capital" onClick={() => {
                props.changeFilter(country.capital.name, false)
              }}>Capital: {country.capital.name}</div>
              <div className="args_country">Currencies: </div>
              {country.currencies && country.currencies.map((currencie) => {
                return (<div>---{currencie.name}</div>)
              })}
              <div className="args_country">Languages: </div>
              {country.languages && country.languages.map((language) => {
                return (<div>---{language.name}</div>)
              })}
              <div className="args_country">Population: {country.population}</div>

            </div>

          )
        } else {
          return (
            <div className="container_info_country" >
              <div className="name_country" onClick={() => {
                setIndex(index_country)
              }}>{country.name}</div>


            </div>
          )
        }
      })}
      {index != -1 &&
        <div className="ventana">
          <div className="cerrar" onClick={() => setIndex(-1)}>X</div>
          <div className="bandera">
            <img src={"https://www.countryflags.io/" + data?.countries[index].alpha2Code + "/flat/64.png"}></img>

          </div>
          <div className="datos">
            <div className="data">Continent: {data?.countries[index].continent.name}</div>
            <div className="data">Name: {data?.countries[index].name}</div>
            <div className="data">Code: {data?.countries[index].alpha2Code}</div>
            <div className="data">Population: {data?.countries[index].population}</div>
            <div className="data capital" onClick={() => {
              props.changeFilter(data?.countries[index].capital.name, false)
            }}>Capital: {data?.countries[index].capital.name}</div>
            {data?.countries[index].languages && data.countries[index].languages.map((language, index) => {
              return (<div className="data">Language {index}: {language.name}</div>)
            })}
            {data?.countries[index].currencies && data.countries[index].currencies.map((currency, index) => {
              return (<div className="data">Currency {index}: {currency.name}</div>)
            })}
            {dataWeather &&
              <div>
                <br />
                <div className="data">Weather description: {dataWeather.weather[0].description}</div>
                <div className="data">Time: {(dataWeather.main.temp - 273.15)}ºC</div>
              </div>
            }
          </div>
        </div>
      }
    </div>
  )

}

export default InfoCountry;