import React, {FC,useEffect, useState } from 'react';
import axios from 'axios';
import "../planets/style.css"

export interface Planets {
    count:    number;
    next:     string;
    previous: null|null;
    results:  Result[];
}

export interface Result {
    name:            string;
    rotation_period: string;
    orbital_period:  string;
    diameter:        string;
    climate:         string;
    gravity:         string;
    terrain:         string;
    surface_water:   string;
    population:      string;
    residents:       string[];
    films:           string[];
    created:         Date;
    edited:          Date;
    url:             string;
}

const PlanetsFC:FC =()=>{
    const [data, setData] = useState<Planets>();
    const [people,setPeople] = useState<Result[]>([]);
    const [item, setItem] = useState<Result[]>();
    const [state,setState] = useState<string>("null");
    const [url,setUrl] = useState<string>("https://swapi.dev/api/planets/");
    
    

    
    useEffect(()=>{
        
            axios.get(url).then((response)=>{
                if(response.data.next!=null){
                    setUrl(response.data.next);
                    setData(response.data);
                    people.push(...response.data.results)
                    console.log(people);
                }else{
                    people.push(...response.data.results)
                }
                
            })
        
    },[data]);

    
    

    


    return (
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
                            {state==="all"&&people.map((value,index)=>{
                                //console.log(value.name);
                                
                                return (
                                    <div className="back_films">
                                        <div className="title">{value.name}</div>
                                        <div className="white">Climate: {value.climate}</div>
                                        <div className="white">Gravity: {value.gravity}</div>
                                        <div className="white">Population: {value.population}</div>+
                                        
                                    </div>
                                )
                            })}
                            {state==="search"&&(
                                <div className="back_films">
                                    <input type="text" className="input_text" onChange={(e)=>{
                                        const items=people.filter((data)=>{
                                            if(data.name.toLowerCase().includes(e.target.value))
                                                return data;
                                            
                                        });
                                        setItem(items)
                                        
                                    }}/>
                                    {item&&item.map((value,index)=>{
                                        return <div className="title">{value.name}</div>
                                    })}
                                </div>
                            )}
                        </div>
                    )}
        </div>
    );
}

export default PlanetsFC;
