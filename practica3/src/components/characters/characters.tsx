import React, {FC,useEffect, useState } from 'react';
import axios from 'axios';
import "../characters/style.css"

interface Characters {
    count:    number;
    next:     string|null;
    previous: string|null;
    results:  Result[];
}

interface Result {
    name:       string;
    height:     string;
    mass:       string;
    hair_color: string;
    skin_color: string;
    eye_color:  string;
    birth_year: string;
    gender:     Gender;
    homeworld:  string;
    films:      string[];
    species:    string[];
    vehicles:   string[];
    starships:  string[];
    created:    Date;
    edited:     Date;
    url:        string;
}

enum Gender {
    Female = "female",
    Male = "male",
    NA = "n/a",
}

const CharactersFC:FC =()=>{
    const [data, setData] = useState<Characters>();
    const [people,setPeople] = useState<Result[]>([]);
    const [item, setItem] = useState<Result[]>();
    const [state,setState] = useState<string>("null");
    const [url,setUrl] = useState<string>("https://swapi.dev/api/people/");
    
    

    
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
                                    <div className="back_film">
                                        <div className="title">Name: {value.name}</div>
                                        <div className="white">Birth: {value.birth_year}</div>
                                        <div className="white">Gender: {value.gender}</div>
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
                                        return (
                                            <div className="back_film">
                                                <div className="title">Name: {value.name}</div>
                                                <div className="white">Birth: {value.birth_year}</div>
                                                <div className="white">Gender: {value.gender}</div>
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

export default CharactersFC;
