import React, { FC, useState }from 'react';
import '../main/style.css';
import Films from "../films/films";
import CharactersFC from "../characters/characters"
import PlanetsFC from "../planets/planets"



const MainContainer:FC= ()=>{

    const [state,setState]= useState<string>("null");

        return (
            <div>
                <div className="container_main">
                
                <div>Star Wars Api</div>
                <div className="container-botones">
                    <div className="button" onClick={()=>{
                        setState("film")
                    }}>Films</div>
                    <div className="button" onClick={()=>{
                        setState("characters")
                    }}>Characters</div>
                    <div className="button" onClick={()=>{
                        setState("planets")
                    }}>Planets</div>
                </div>
                

                
            </div>
            <div>
                {state==="null"&&(<div>Click on one of the buttons to continue ...</div>)}
                {state==="characters"&&(<CharactersFC/>)}
                {state==="planets"&&(<PlanetsFC/>)}
                {state==="film"&&(<Films/>)}
            </div>
            </div>
        );
}


export default MainContainer;


