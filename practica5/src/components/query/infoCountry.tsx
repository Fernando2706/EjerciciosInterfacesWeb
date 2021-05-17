import React, {useState, FC} from 'react';
import ClipLoader from "react-spinners/ClipLoader";
import { gql, useQuery } from "@apollo/client"
import './infoCountry.css'


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
      }
      name
      alpha2Code
    }
  }
    
  
`

interface CountryProps{
  name: string
  changeFilter: Function,
}

interface ICountry{
  countries: Array<{
    continent: {
      name:string
    },
    capital: {
      name:string
    },
    currencies: Array<{
      name:string
    }>,
    population: number,
    languages: Array<{
      name:string
    }>,
    name:string,
    alpha2Code:string
  }>
}

const InfoCountry: FC<CountryProps> = (props) => {

  const {data,loading,error} = useQuery<ICountry>(Country,{variables:{name:props.name}})
  const [index, setIndex] = useState<number>(-1);

  return (
    <div className="container_global_country">
      {loading&& <ClipLoader color="blue"/>}
      {error && <div>{error.message}</div>}
      {data && data.countries.map((country, index_country) => {
        if (index === index_country) {
          return (
            <div className="container_info_country" >
              <div className="name_country no" onClick={() => {
                setIndex(index)
              }}>{country.name}</div>
              <div className="args_country">Continent: {country.continent.name}</div>
              <div className="capital" onClick={() => {
                props.changeFilter(country.capital.name,false)
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
      {index!=-1&&
        <div className="ventana">
            <div className="cerrar" onClick={()=>setIndex(-1)}>X</div>
            <div className="bandera">
              <img src={"https://www.countryflags.io/"+data?.countries[index].alpha2Code+"/flat/64.png"}></img>

            </div>
            <div className="datos">
              <div className="data">Name: {data?.countries[index].name}</div>
              <div className="data">Code: {data?.countries[index].alpha2Code}</div>
              <div className="data">Population: {data?.countries[index].population}</div>
              <div className="data">Capital: {data?.countries[index].capital.name}</div>
              <div className="data">Language: {data?.countries[index].languages[0].name}</div>
            </div>
        </div>
      }
    </div>
  )

}

export default InfoCountry;