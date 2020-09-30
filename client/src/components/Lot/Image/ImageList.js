import React from "react";
import ImageItem from "./ImageItem";
import "./ImageList.css";

const ImageList = (props) => {
  return (
    <div className="lot-images">
      {props.imageUrls &&
        props.imageUrls.map((url) => <ImageItem key={url} url={url} />)}
    </div>
  );
};

export default ImageList;
