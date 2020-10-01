import React from "react";
import { Pane, Text } from "evergreen-ui";
import ImageItem from "./ImageItem";
import "./ImageList.css";

const ImageList = (props) => {
  return (
    <Pane>
      {props.imageUrls &&
        props.imageUrls.map((url) => <ImageItem key={url} url={url} />)}
    </Pane>
  );
};

export default ImageList;
