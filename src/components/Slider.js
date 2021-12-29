import React from 'react';
import { Zoom } from 'react-slideshow-image';

import slide1 from "../img/slide1.jpg"
import slide2 from "../img/slide2.jpg"
import slide3 from "../img/slide3.jpg"

const Slider = () => {
  const images = [
    slide1,
    slide2,
    slide3
  ];

  const zoomInProperties = {
    indicators: true,
    scale: 1.4
  }
  return (
    <div>
      <Zoom {...zoomInProperties}>
        {images.map((each, index) => (
          <div key={index} style={{width: "100%"}}>
            <img style={{ objectFit: "cover", width: "100%" }} src={each} />
          </div>
        ))}
      </Zoom>
    </div>
  )
}

export default Slider;
