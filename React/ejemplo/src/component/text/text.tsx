import React, {FC, useState, useEffect} from 'react';
import axios from 'axios';
interface IText{
    text:string,
}


const Text:FC=()=>{
    const [data,setData]=useState<any>();
    const [state,setState]=useState<string>("")
    useEffect(()=>{
        axios.get("https://rickandmortyapi.com/api").then((response)=>{
            setData(response);
        })
    },[]);
    console.log(data);
    
    return(
        <div>
           {!data&&"loading"}
           {data&& (
                <div>
                    <div >{data.data.characters}</div>
                    <div >{data.data.episodes}</div>
                    <div >{data.data.locations}</div>
                </div>
                
           )}
           
        </div>
    )
};


export default Text