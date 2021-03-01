import React, { FC } from 'react';
import "./teclado.css"
interface ITecladoProps{
    update:Function,
    igual:Function,
    borrar:Function
}


const Teclado:FC<ITecladoProps>=({update, igual, borrar})=>{
return (
    <div className="teclado" >
        <div className="fila">
            <div className="teclas" onClick={(e)=>update("1")}>1</div>
            <div className="teclas" onClick={(e)=>update("2")}>2</div>
            <div className="teclas" onClick={(e)=>update("3")}>3</div>
            <div className="teclas" onClick={(e)=>update("*")}>*</div>
        </div>
        <div className="fila">
            <div className="teclas" onClick={(e)=>update("4")}>4</div>
            <div className="teclas" onClick={(e)=>update("5")}>5</div>
            <div className="teclas" onClick={(e)=>update("6")}>6</div>
            <div className="teclas" onClick={(e)=>update("/")}>/</div>
        </div>
        <div className="fila">
            <div className="teclas" onClick={(e)=>update("7")}>7</div>
            <div className="teclas" onClick={(e)=>update("8")}>8</div>
            <div className="teclas" onClick={(e)=>update("9")}>9</div>
            <div className="teclas" onClick={(e)=>update("-")}>-</div>
        </div>
        <div className="fila">
            <div className="teclas" onClick={(e)=>update("0")}>0</div>
            <div className="teclas" onClick={(e)=>update("+")}>+</div>
            <div className="teclas" onClick={(e)=>igual()}>=</div>
            <div className="teclas" onClick={(e)=>borrar()}>C</div>
        </div>


    </div>
)
}
export default Teclado;