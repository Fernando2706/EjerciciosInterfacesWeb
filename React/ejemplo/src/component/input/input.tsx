import React, {FC, useState} from 'react';

interface IText{
    text:string,
    update:(value:string)=>void
}


const Input:FC<IText>=({text, update})=>{


    return(
        <div>
            <input type="text" value={text} onChange={(e)=>{
                update(e.target.value);
            }}/>
        </div>
    )
};


export default Input