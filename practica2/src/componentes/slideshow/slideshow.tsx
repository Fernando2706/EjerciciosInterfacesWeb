import React, { FC , useState} from 'react';
import './style.css'

const images:string[]=[
    "url(https://fmaitsolutions.es/imagenes/imagen1.jpg)",
    "url(https://fmaitsolutions.es/imagenes/imagen2.jpg)",
    "url(https://fmaitsolutions.es/imagenes/imagen3.jpg)",
    "url(https://fmaitsolutions.es/imagenes/imagen4.jpeg)",
    "url(https://fmaitsolutions.es/imagenes/imagen5.jpeg)",
]

const SlideShow=()=>{
    const [index,setIndex]= useState(0);
    const [url,setUrl]=useState<string>("");
    


    return(
        
        <div className="container2">
            <div className="imagenBig">
                <div className="select" style={{backgroundImage:url}}></div>
            </div>

            <div className="slideshow">
            <div className="Slider"
                style={{transform:`translate3d(${-index*100}%,0,0)`}}
            >
                {images.map((image,index)=>{
                    
                    return (<div 
                    className="imagen" 
                    key={index} 
                    style={{backgroundImage:image}}
                    onClick={()=>{
                        console.log(window.screen.height);
                        
                        setUrl(images[index]);
                    }}
                
                    
                ></div>);
                })}
            </div>
            <div className="button">
                {images.map((_,i)=>{
                    return (<div 
                        key={i} 
                        className={`buttons${index===i ? " active":""}`}
                        onClick={()=>{
                            
                            setIndex(i);
                        }}
                        
                        ></div>);
                })}
            </div>
        </div>
        </div>


        
    );

}

export default SlideShow;