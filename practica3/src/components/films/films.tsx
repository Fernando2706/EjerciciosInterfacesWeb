import React, {FC,useEffect, useState } from 'react';
import axios from 'axios';
import '../films/style.css'


//use https://app.quicktype.io/
interface Films {
    count:    number;
    next:     null;
    previous: null;
    results:  Result[];
}

interface Result {
    title:         string;
    episode_id:    number;
    opening_crawl: string;
    director:      string;
    producer:      string;
    release_date:  Date;
    characters:    string[];
    planets:       string[];
    starships:     string[];
    vehicles:      string[];
    species:       string[];
    created:       Date;
    edited:        Date;
    url:           string;
}


const Films:FC = ()=>{
    const [data, setData] = useState<Result[]>();
    const [item, setItem] = useState<Result[]>();
    const [state,setState] = useState<string>("null");
    const [type,setType] = useState<string>("normal");

    useEffect(()=>{
        axios.get("https://swapi.dev/api/films/").then((response)=>{
            setData(response.data.results);
        });
    },[]);



    return(
        <div>
            <div className="back">
            {!data&&"loading"}
            {data&&(
                <div>
                    <div className="buttons" onClick={()=>{
                        setState("all")
                    }}>Get All</div>
                    <div className="buttons"  onClick={()=>{
                        setState("search")
                    }}>Search...</div>

                    
                </div>
            )}
        </div>
                    {data&&(
                        <div className="back_films">
                            {state==="null"&&"Waiting..."}
                            {state==="all"&&data.map((value,index)=>{
                                return (
                                    <div className="back_films">
                                        <div className="title">{value.title}</div>
                                        <div className="white">{value.opening_crawl}</div>
                                    </div>
                                )
                            })}
                            {state==="search"&&(
                                <div className="back_films">
                                    <input type="text" className="input_text" onChange={(e)=>{
                                        const items=data.filter((data)=>{
                                            if(data.title.toLowerCase().includes(e.target.value))
                                                return data;
                                            
                                        });
                                        setItem(items)
                                        
                                    }}/>
                                    {item&&item.map((value,index)=>{
                                        return (
                                            <div className="back_films">
                                                <div className="title">{value.title}</div>
                                                <div className="white">{value.opening_crawl}</div>
                                            </div>
                                        )
                                    })}
                                </div>
                            )}
                        </div>
                    )}
        </div>
    );
}


export default Films;