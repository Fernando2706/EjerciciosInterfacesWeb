import React, { FC , useState} from 'react';
import './style.css'
import SlideShow from '../slideshow/slideshow'
const Container= ()=>{
    

    return(
        <div className="container">
           <SlideShow/>
        </div>
    );
}
export default Container;