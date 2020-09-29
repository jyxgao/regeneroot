import React from 'react';
import Img from './Img'

export default function ImgList(props) {
    return (
      <ul>
        {props.urls && props.urls.map((url) => (
            <Img key={url} url={url}/>
          )
        )}
      </ul>
    )
}

