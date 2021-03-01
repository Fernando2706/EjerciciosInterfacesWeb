import React, { FC , useState} from 'react';
import "./calculadora.css"
import  Pantalla from "../Pantalla/pantalla"
import Teclado from "../teclado/teclado"

interface ICalculadoraProps{
    text:string;
}

const Calculadora:FC<ICalculadoraProps>= (props)=>{
    const [valor, setValor]= useState<string>("");
    const updateValor=(v:string)=>{
        setValor(valor+v)
    }
    const igual=()=>{
        setValor(eval(valor));
    }
    const borrar=()=>{        
        if(valor.length>0){
            const a = valor.substring(0,valor.length-1);
            console.log(a); 
            setValor(a);
        }
        
    }

    return(
        <div className="calculadora">{props.text}
            <Pantalla text={valor}></Pantalla>
            <Teclado update={updateValor} igual={igual} borrar={borrar}></Teclado>
        </div>
    );
}
export default Calculadora;