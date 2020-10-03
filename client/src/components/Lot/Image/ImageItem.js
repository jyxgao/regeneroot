import React from "react";
import "./ImageItem.css";

const Image = (props) => {
  return (
    <div>
      <img className="lot-img" alt="urbanlot" src={props.url} />
    </div>
  );
};

export default Image;
