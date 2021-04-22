import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';

import Filter from './components/Filter/Filter'

import Body from './components/Body/Body'

function App() {

  const[type, setType]=useState<boolean>(false);
  const[filter, setFilter]=useState<string>("");

  const changeFilter= (filter:string)=>{
    setFilter(filter);
  }

  const isTitle = (type:boolean)=>{
    setType(type)
  }

  return (
    <div>
      <Filter isTitle={isTitle} changeFilter={changeFilter}></Filter>
      {filter&&<Body type={type} filter={filter}/>}

      
    </div>
  );
}

export default App;
