import React, { useState } from "react";
import "./Slider.css";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";

const Slider = (props) => {
  const handleOnDragStart = (e) => e.preventDefault();
  const responsive = {
    0: { items: 1 },
    1024: { items: 1 },
  };
  // [images, setImages] = useState([]);
  // const images = props.imageUrls.map((url) => <img src={url} alt="lot" />);
  // setImages(images);

  // if (props.imageUrls) {
  // }
  return (
    <AliceCarousel className="slider-carousel" mouseTrackingEnabled={true} responsive={responsive}>
      {props.urls.map((url) => (
        <img src={url} className="slider--lot-img" onDragStart={handleOnDragStart} />
      ))}
    </AliceCarousel>
  );
};

export default Slider;
