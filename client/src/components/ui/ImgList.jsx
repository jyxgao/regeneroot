import React from 'react';
import Img from './Img'

export default function ImgList(props) {
  // console.log(props.urls)
  // const props = [{id:1, url: "https://images.pexels.com/photos/744667/pexels-photo-744667.jpeg?cs=srgb&dl=pexels-rakicevic-nenad-744667.jpg&fm=jpg"}, {id: 2, url: "https://www.pexels.com/photo/rear-view-of-silhouette-man-against-sky-during-sunset-325790/"}]
  // const props = ["https://images.pexels.com/photos/744667/pexels-photo-744667.jpeg?cs=srgb&dl=pexels-rakicevic-nenad-744667.jpg&fm=jpg", "https://www.pexels.com/photo/rear-view-of-silhouette-man-against-sky-during-sunset-325790/"]
    return (
      <ul>
        {props.urls && props.urls.map((url) => (
          <li>
            <Img url={url}/>
          </li> 
          )
        )}
      </ul>
    )
}

