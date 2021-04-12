import React , {FC, useState} from 'react';
import Body from "../body/Body";
import "./style.css"

const Main:FC = ()=>{

    const [search,setSearch] = useState<string>("");
    const [state,setState] =useState<string>();


    return(
        <div className="back">
            <div className="title">Buscador de Libros</div>
            <div className="container">
                <input type="text" onChange={(e)=>setSearch(e.target.value)}/>
                <div className="boton" onClick={(e)=>setState("searching")}>Buscar</div>
            </div>
            {!state&&(<div className="text_aux">Dale a buscar para continuar</div>)}
            {state&&<Body text={search}></Body>}
        </div>
    )

}
export default Main;