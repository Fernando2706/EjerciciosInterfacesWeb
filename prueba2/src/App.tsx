import React from "react"
import {useState} from 'react';
import './App.css';
import TopImage from "./componentes/TopImage/TopImage"
import BottomImage from "./componentes/BottomImage/BottomImage"

function App() {
  const images = [
    ["https://www.w3schools.com/howto/img_nature_wide.jpg", "1 / 4", "Caption text"],
    ["https://www.w3schools.com/howto/img_snow_wide.jpg", "2 / 4", "Caption two"],
    ["https://www.w3schools.com/howto/img_lights_wide.jpg", "3 / 4", "Caption three"],
    ["https://www.w3schools.com/howto/img_mountains_wide.jpg", "4 / 4", "Caption four"]
  ]
  const [topImg, setImg] = useState<string>("")
  var [bottomImg, setBottomImg] = useState<string>(images[0][0])
  var [bottomNumberText, setBottomNumberText] = useState<string>(images[0][1])
  var [bottomText, setBottomText] = useState<string>(images[0][2])
  var [slideIndex, setSlideIndex] = useState<number>(0)

  const plusSlides = (n: number) => {
    setSlideIndex(slideIndex += n)
    showSlides(slideIndex)
  }
  
  const currentSlide = (n: number) => {
    setSlideIndex(slideIndex = n)
    showSlides(slideIndex)
  }
  
  const showSlides = (n: number) => {
    if(n > images.length-1) {
      setSlideIndex(0)
      n = 0
    } else if(n < 0) {
      setSlideIndex(images.length-1)
      n = images.length-1
    }
    setBottomImg(bottomImg = images[n][0])
    setBottomNumberText(bottomNumberText = images[n][1])
    setBottomText(bottomText = images[n][2])
  }

  const setTopImg = (src: string) => {
    setImg(src)
  }

  return (
    <div className="App">
      <TopImage text={topImg}></TopImage>
      <BottomImage text={bottomText} src={bottomImg} numberText={bottomNumberText} plusSlides={plusSlides} currentSlide={currentSlide} setTopImg={setTopImg}></BottomImage>
    </div>
  );
}

export default App;