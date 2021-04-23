import React, {FC,useState}  from 'react'
import './Filter.css'

interface FilterProps{
    isTitle:Function,
    changeFilter:Function
}


const Filter:FC<FilterProps> =(props)=>{

    const [searchTitle,setTitle]= useState<string>("");
    const [searchAuthor,setAuthor]= useState<string>("");


    
    return (
        <div className="containerFilter">
            <div>
                <input className="buscador" type="text" placeholder="Buscar libros por titulos" value={searchTitle} onChange={(e)=>{
                    setAuthor("")
                    setTitle(e.target.value)
                }}/>
                <input className="buscador" type="text" placeholder="Buscar libros por autor" value={searchAuthor} onChange={(e)=>{
                    setTitle("");
                    setAuthor(e.target.value)
                }}/>
            </div>
            <div className="boton" onClick={(e)=>{
                if(searchAuthor!==""){
                    props.changeFilter(searchAuthor.replaceAll(" ","+"))
                    props.isTitle(false)
                }else{
                    props.changeFilter(searchTitle.replaceAll(" ","+"))
                    props.isTitle(true)
                }
            }}>Buscar</div>
        </div>
    )
}

export default Filter;