import React, {FC, useState} from 'react';
import './style.css'

interface InputTextProps{
    changeFilter: Function,
  }

const Input: FC<InputTextProps>=(props)=>{

    const [text,setText]= useState<string>("");

    return(
        <div className="search">
            <input placeholder="Enter a name to continue" className="input_text" type="text" onChange={(e) => {
                setText(e.target.value)       
            }} />
          <div className="button" onClick={() => {
              console.log(text);
              
              props.changeFilter(text);              
            }}>Search</div>
        </div>
    );
}

export default Input;