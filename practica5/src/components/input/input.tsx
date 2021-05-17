import { fchmod } from 'fs';
import React from 'react';
import {FC, useState} from 'react';
import './input.css'

interface InputTextProps{
  changeFilter: Function,
}

const InputText: FC<InputTextProps> = (props) => {

  const [searchName, setName] = useState<string>("")
  const [type, setType] = useState<boolean>(false);
  
  return (
    <div className="container">

      <div className="box">
        <div className="container_search">
            <input placeholder="Enter a name to continue" className="input_text" type="text" onChange={(e) => {
                setName(e.target.value)       
            }} />
          <div className="button" onClick={() => {
            props.changeFilter(searchName,type)
            }}>Search</div>
        </div>
        <div className="container_type">
            {!type&&"✔"}
          <div className="type" onClick={() => {
            setType(false);
            }}>City</div>
            {type&&"✔"}
          <div className="type" onClick={() => {
            setType(true)
            }}>Country</div>
          </div>
      </div>

    </div>
  );

}


export default InputText;