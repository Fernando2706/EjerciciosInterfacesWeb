import React, {FC, useState, useEffect} from 'react';
import axios from 'axios';



const Episodes:FC=()=>{

    const [data,setData]=useState<any>();
    const [episodes,setEpisodes]=useState<any>();
    
        useEffect(()=>{
            axios.get("https://rickandmortyapi.com/api/episode").then((response)=>{
                if(response.data.info.next){
    
                }
                setEpisodes(response.data.results);
                
                
                setData(response.data);
                
            })
        },[]);
    


    
    
    return(
        <div>
            {!data&&"Fetching data"}
            {data&&episodes.map((value:any, index:number)=>{
                return <div>{value.name}</div>
            })}
        </div>
    );
}

export default Episodes;