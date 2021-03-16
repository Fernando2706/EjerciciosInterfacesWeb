import React, {FC, useState, useEffect} from 'react';
import axios from 'axios';
import './style.css'

import Characters from '../text/characters/characters';
import Episodes from '../text/episodes/episodes';
import Locations from '../text/location/locations'



interface IText{
    text:string,
}


const Text:FC=()=>{
    const [data,setData]=useState<any>();
    const [state,setState]=useState<string>("null")
    useEffect(()=>{
        axios.get("https://rickandmortyapi.com/api").then((response)=>{
            setData(response);
        })
    },[]);
    const changeState=(_state:string)=>{
        setState(_state)
    }
    
    return(
        <div className="father">
           {!data&&"loading"}
           {data&& (
                <div className="father">
                    <div className="link" onClick={(e)=>{
                        changeState("characters")
                    }}>{data.data.characters}</div>
                    <div className="link" onClick={(e)=>{
                        changeState("episodes")
                    }}>{data.data.episodes}</div>
                    <div className="link" onClick={(e)=>{
                        changeState("locations")
                    }}>{data.data.locations}</div>
                </div>
           )}
           {state==="null"}
           {state==="characters"&&<Characters/>}
           {state==="episodes"&&<Episodes/>}
           {state==="locations"&&<Locations/>}
           
        </div>
    )
};


export default Text