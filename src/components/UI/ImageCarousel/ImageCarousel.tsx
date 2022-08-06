import React from 'react';
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import "./ImageCarousel.scss";


type ImageCarouselProps = {
  images: string[]
}

const ImageCarousel = ({images}: ImageCarouselProps) => {
  const imagesForm = images.map((image, index) => {
    // aws image
    // const imagex = `${process.env.REACT_APP_API_URL}/location/${image}/download`
    // aws image
    const imagex = image

    return (
      <div key={index}>
        <img src={imagex} />
      </div>
    );
  });
  return (
    <div>
      <Carousel dynamicHeight={false} width="100%"  showThumbs={false} >
        {imagesForm}
      </Carousel>
    </div>
  );
};

export default ImageCarousel;


