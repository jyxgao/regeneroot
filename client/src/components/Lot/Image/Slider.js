import React from "react";
import "./Slider.css";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";

const Slider = (props) => {
  const handleOnDragStart = (e) => e.preventDefault();
  const responsive = {
    0: { items: 1 },
    1024: { items: 1 },
  };
  return (
    <AliceCarousel className="slider-carousel" mouseTrackingEnabled={true} responsive={responsive}>
      {props.urls.map((url) => (
        <img key={url} src={url} alt="lot-img" className="slider--lot-img" onDragStart={handleOnDragStart} />
      ))}
    </AliceCarousel>
  );
};

export default Slider;
