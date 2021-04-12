import {FC} from "react"
import "./BottomImage.css"

interface BottomImageProps {
    text: string;
    src: string;
    numberText: string;
    plusSlides: Function;
    currentSlide: Function;
    setTopImg: Function;
}

const BottomImage: FC<BottomImageProps> = (props) => {
    return (
        <div className="bottomImage">
            <div className="slideshow-container">
                <div className="mySlides fade">
                    <div className="numbertext">{props.numberText}</div>
                    <img src={props.src} alt="" className="slideImg" onClick={(e) => props.setTopImg(props.src)}/>
                    <div className="text">{props.text}</div>
                </div>

                <div className="prev" onClick={(e) => props.plusSlides(-1)}>&#10094;</div>
                <div className="next" onClick={(e) => props.plusSlides(1)}>&#10095;</div>
            </div>
            <div className="dots">
                <span className="dot" onClick={(e) => props.currentSlide(0)}></span>
                <span className="dot" onClick={(e) => props.currentSlide(1)}></span>
                <span className="dot" onClick={(e) => props.currentSlide(2)}></span>
                <span className="dot" onClick={(e) => props.currentSlide(3)}></span>
            </div>
        </div>
    )
}

export default BottomImage