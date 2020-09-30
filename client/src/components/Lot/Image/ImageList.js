import React from 'react';
import ImageItem from './ImageItem'

const ImageList = (props) => {
    return (
      <ul>
        {props.imageUrls && props.imageUrls.map((url) => (
            <ImageItem key={url} url={url}/>
          )
        )}
      </ul>
    )
}

export default ImageList;