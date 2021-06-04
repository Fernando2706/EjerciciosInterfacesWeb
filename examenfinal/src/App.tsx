import React, { useState, useRef} from 'react';
import './App.css';

import axios from 'axios';

interface Character{
  birth:string,
  death:string,
  gender:string,
  hair:string,
  height:string,
  name:string,
  race:string,
  realm:string,
  spouse:string,
  wikiUrl:string,
  _id:string
}

interface IReponse{
  dialog:string,
  movie:string,
  character:string
}

const trial_name ="Frodo"

const quotes:string[]=["Hola","Mundo","Esto","Es","Una","Prueba"]

function App() {
  const [info,setInfo]=useState<string[]>();
  const[quotess,setQoutess]= useState<[IReponse]>()
  let text:string;
  let key:string="";

  const call = (name:string)=>{
    var url="https://the-one-api.dev/v2/character?name="+name
    console.log(url);
    console.log(key);
    let id:string="";
    try {
      axios.get(url,{
        headers:{
          'Accept':'application/json',
          'Authorization':'Bearer '+key
        }
      }).then((response)=>{   
        console.log(response.data.docs[0]);
        setQuotes(response.data.docs[0]._id,key);
      });
    } catch (error) {
      console.log(error);
    }
    
  
  }

  const setQuotes=(id:string,key1:string)=>{
    axios.get("https://the-one-api.dev/v2/character/"+id+"/quote",{
          headers:{
            'Accept':'application/json',
            'Authorization':'Bearer '+key1
          }
        }).then((response)=>{
          console.log(response.data.docs);
          setQoutess(response.data.docs)
        });
  }

  const getQuote= (key1:string)=>{
    if(quotess){
      console.log("Obteniendo cita");
      var num = Math.floor(Math.random() * (quotess.length - 0) + 0);
      console.log(num);
      var film:string="";
      
      var data:string[]=[quotess[num].dialog,quotess[num].movie];
      setInfo(data);
    }
  }
  
  return (
    <div className="App">
      <div className="search">
            <input placeholder="Enter a name to continue" className="input_text" type="text" onChange={(e) => {
                text=e.target.value   
            }} />
          <div className="button" onClick={() => {
              call(text);
            }}>Search</div>
            <input placeholder="Enter a key to continue" className="input_text" type="text" onChange={(e) => {
                key=e.target.value   
            }} />
        </div>
      {quotess&&
      <div className="container">
        <div className="getCita" onClick={(e)=>{
         
          getQuote("zM9YOZWZ6pXiIktBtCnQ");
        }}>Dame una cita</div>
        <div className="quote">
          {info&&
            <div>
              <div>{info[0]}</div>
              <div>{info[1]}</div>
            </div>
          }
        </div>

      </div>
      }
      {(!quotess)&&
      <div className="center">
        <div className="Gollumn"></div>
      </div>
      }
      
      
    </div>
  );
}

export default App;
