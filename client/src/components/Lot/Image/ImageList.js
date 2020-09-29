import React from 'react';
import ImageItem from './ImageItem'

const ImageList = (props) => {
    return (
      <ul>
        {props.urls && props.urls.map((url) => (
            <ImageItem key={url} url={url}/>
          )
        )}
      </ul>
    )
}

export default ImageList;