import React, {FC, useState, useEffect} from 'react';
import axios from 'axios';

interface ICharacters{

}


const Characters:FC=()=>{

    const [data,setData]=useState<any>();
    const [characters,setCharacters]=useState<any>();
    useEffect(()=>{
        axios.get("https://rickandmortyapi.com/api/character").then((response)=>{
            setCharacters(response.data.results);
            
            
            setData(response.data);
            
        })
    },[]);
    
    return(
        <div>
            {!data&&"Fetching data"}
            {data&&characters.map((value:any, index:number)=>{
                return <div>{value.name}</div>
            })}
        </div>
    );
}

export default Characters;