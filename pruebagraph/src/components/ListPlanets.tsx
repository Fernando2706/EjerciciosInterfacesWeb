import React, {FC} from 'react';
import { gql , useQuery} from '@apollo/client';

const Planets= gql`
    query locations{
        locations{
            result{
                name
            }
        }
    }    
`
interface IPlanets{
    locations:{results:{
        name:string
    }}
}

const ListPlanets:FC = ()=>{
    const {data,loading,error}=useQuery<IPlanets>(Planets)
    if(loading) return <div>Cargando Planetas</div>
    if(error) return <div>{error}</div>
    return(
        <div>
            {data&&"hola"}
        </div>
    )
}

export default ListPlanets