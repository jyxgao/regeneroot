import React from "react";
import './ImageItem.css';

const Image = (props) => {
  return <img className="lot-img" src={props.url} />;
};

export default Image;
