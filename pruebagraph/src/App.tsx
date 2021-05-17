import React from 'react';
import logo from './logo.svg';
import './App.css'; 
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import ListPlanets from './components/ListPlanets'

import styled from '@emotion/styled'
import { useState } from 'react';
import { log } from 'node:console';

const client = new ApolloClient({
  uri: process.env.REACT_APP_API_URL,
  cache: new InMemoryCache()
});

const Button =styled.button`
  border : 1px solid black;
  background-color:red;
`

const Planeta=styled.input<{edit:boolean}>`
    color:blue;
    width:min-content;
    background-color: ${props=>props.edit ? 'gray':'white'};
`





const Container=styled.div`
  display:flex;
  flex-direction:column
`

function App() {
  const planets=["Tierra","Mercurio","Marte","Pluton","Jupiter"]
  const[index,setIndex]=useState<number>(-1)
  const  [editing,setEditing]=useState<number[]>([]);
  const[aplanets,setPlanet]=useState<string[]>(planets)

  
  return (
    
    <div style={{display:"flex",flexDirection:"column"}}>
    {aplanets.map((planet,i)=>{
      return <Planeta edit={editing.includes(i)} onFocus={(e)=>{
        if(!editing.includes(i)){
          setEditing([...editing,i])
        }
      }} value={planet} key={i} onChange={(e)=>{
        planets[i]=e.target.value;
        setPlanet([...planets])
      }}></Planeta>
    })}
    </div>
  );
}

export default App;
