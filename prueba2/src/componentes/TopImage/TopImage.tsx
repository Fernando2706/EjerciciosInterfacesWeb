import {FC} from "react"
import "./TopImage.css"

interface TopImageProps {
    text: string;
}

const TopImage: FC<TopImageProps> = (props) => {
    return (
        <div className="container">
            <img src={props.text} alt="Elige una imagen en el carrusel" className="topImage"/>
        </div>
    )
}

export default TopImage