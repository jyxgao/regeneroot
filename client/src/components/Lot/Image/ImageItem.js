import React from "react";
import './ImageItem.css';

const Image = (props) => {
  return <img className="lot-img" alt="urbanlot" src={props.url} />;
};

export default Image;
