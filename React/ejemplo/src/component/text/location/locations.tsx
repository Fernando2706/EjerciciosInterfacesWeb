import React, {FC, useState, useEffect} from 'react';
import axios from 'axios';



const Locations:FC=()=>{

    const [data,setData]=useState<any>();
    const [locations,setLocations]=useState<any>();
    useEffect(()=>{
        axios.get("https://rickandmortyapi.com/api/location").then((response)=>{
            setLocations(response.data.results);
            
            
            setData(response.data);
            
        })
    },[]);
    
    return(
        <div>
            {!data&&"Fetching data"}
            {data&&locations.map((value:any, index:number)=>{
                return <div>{value.name}</div>
            })}
        </div>
    );
}

export default Locations;