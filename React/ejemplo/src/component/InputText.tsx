import { stringify } from 'querystring';
import React, {FC, useState} from 'react';

interface StateI{
    pwd:string,
    hidden:boolean
}

const InputTextComponent: FC = ()=>{
    const[password,setPass]=useState<string>("");
    const [state,setState]=useState<{pwd:string,hidden:boolean}>({
        pwd:"",
        hidden:true
    });

    let value:string|string[];
    if(state?.hidden){
        value=Array.from(state.pwd).map(e=>"*");
        value=value.toString();
    }else{
        value=state.pwd;
    }
    
    return (
        <div >
            <input type="text" name="text1" id="text" value={value} onChange={(e)=>{

                setState({...state,pwd:state.pwd+e.target.value[e.target.value.length-1]})
                
                
            }}></input>
            <button onClick={(e)=>{
                setState({...state,hidden:!state.hidden})
                
                
            }}>Ver</button>

        </div>
    );
}

export  default InputTextComponent ;