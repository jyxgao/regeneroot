import React from "react";
import LotListItem from "./LotListItem";

export default function LotList(props) {
  // const lots = [{
  //   manyPhoto: [{id:1, url:"https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pinterest.com%2Fspeterson1024%2Ftiny-hearts%2F&psig=AOvVaw1h36nTO0LIC7Vxr-OZWC5P&ust=1601337566857000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCMjdqLnFiuwCFQAAAAAdAAAAABAD"}],
  //   name: "SeaIsland",
  //   lotDescription: "Beatiful land",
  //   id: 1
  // },
  // { id: 2,
  //   name: "HTMLDataListElement",
  //   lotDescription: "Happy happy",
  //   manyPhoto: []

  // }]

  const lots = [{
    image_url: ["https://www.google.com/imgres?imgurl=https%3A%2F%2Fi.ytimg.com%2Fvi%2FMPV2METPeJU%2Fmaxresdefault.jpg&imgrefurl=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DMPV2METPeJU&tbnid=KypVIfrnXZbYeM&vet=12ahUKEwjEqZGY9onsAhUpBzQIHTQSBroQMygAegUIARDOAQ..i&docid=PesX8IHCvvYULM&w=1280&h=720&q=dog%20&ved=2ahUKEwjEqZGY9onsAhUpBzQIHTQSBroQMygAegUIARDOAQ", "https://www.google.com/imgres?imgurl=https%3A%2F%2Fhips.hearstapps.com%2Fhmg-prod.s3.amazonaws.com%2Fimages%2Fdog-puppy-on-garden-royalty-free-image-1586966191.jpg%3Fcrop%3D0.752xw%3A1.00xh%3B0.175xw%2C0%26resize%3D640%3A*&imgrefurl=https%3A%2F%2Fwww.goodhousekeeping.com%2Flife%2Fpets%2Fg4531%2Fcutest-dog-breeds%2F&tbnid=4b_SfrcNu94-EM&vet=12ahUKEwjEqZGY9onsAhUpBzQIHTQSBroQMygDegUIARDVAQ..i&docid=2r6Arj4-hBjhNM&w=640&h=638&q=dog%20&ved=2ahUKEwjEqZGY9onsAhUpBzQIHTQSBroQMygDegUIARDVAQ"],
    name: "SeaIsland",
    lotDescription: "Beatiful land",
    id: 1
  },
  { id: 2,
    name: "HTMLDataListElement",
    lotDescription: "Happy happy",
    image_url: ["https://www.google.com/imgres?imgurl=https%3A%2F%2Fhips.hearstapps.com%2Fhmg-prod.s3.amazonaws.com%2Fimages%2Fdog-puppy-on-garden-royalty-free-image-1586966191.jpg%3Fcrop%3D0.752xw%3A1.00xh%3B0.175xw%2C0%26resize%3D640%3A*&imgrefurl=https%3A%2F%2Fwww.goodhousekeeping.com%2Flife%2Fpets%2Fg4531%2Fcutest-dog-breeds%2F&tbnid=4b_SfrcNu94-EM&vet=12ahUKEwjEqZGY9onsAhUpBzQIHTQSBroQMygDegUIARDVAQ..i&docid=2r6Arj4-hBjhNM&w=640&h=638&q=dog%20&ved=2ahUKEwjEqZGY9onsAhUpBzQIHTQSBroQMygDegUIARDVAQ", "https://www.google.com/imgres?imgurl=https%3A%2F%2Fhips.hearstapps.com%2Fhmg-prod.s3.amazonaws.com%2Fimages%2Fdog-puppy-on-garden-royalty-free-image-1586966191.jpg%3Fcrop%3D0.752xw%3A1.00xh%3B0.175xw%2C0%26resize%3D640%3A*&imgrefurl=https%3A%2F%2Fwww.goodhousekeeping.com%2Flife%2Fpets%2Fg4531%2Fcutest-dog-breeds%2F&tbnid=4b_SfrcNu94-EM&vet=12ahUKEwjEqZGY9onsAhUpBzQIHTQSBroQMygDegUIARDVAQ..i&docid=2r6Arj4-hBjhNM&w=640&h=638&q=dog%20&ved=2ahUKEwjEqZGY9onsAhUpBzQIHTQSBroQMygDegUIARDVAQ", ]

  }]

  const many = lots.map((lot) => {
    
    return (
      <li>
      <LotListItem
        key={lot.id}
        name= {lot.name}
        lotDescription = {lot.lotDescription}
        url={lot.image_url}
      />
      </li>
    )
  })
return <ol>{many}</ol>
} 