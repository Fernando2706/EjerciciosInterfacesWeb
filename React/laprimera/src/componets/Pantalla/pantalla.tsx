import React, { FC } from 'react';
import "./pantalla.css"

interface ICalculadoraProps{
    text:string;
}

const pantalla:FC<ICalculadoraProps>=(props)=>{
return (
    <div className="Pantalla" >{props.text}</div>
)
}
export default pantalla;