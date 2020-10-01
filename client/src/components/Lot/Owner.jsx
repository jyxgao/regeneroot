import React, { useState, useEffect } from "react";
import axios from "axios";
import LotListItem from "./SmallLotItem";
import useVisualMode from '../../hooks/useVisualMode';


const Owner = (props) => {


  const [lots, setLots] = useState([])
  const [logedin, setlogedin] = useState(true)

  
  useEffect (() => {
    axios.get('/api/lots/owned')
    .then((results) => {
      console.log("please show me some,", results.data)
      setLots(results.data )
    })},
    [])

  return(
    <article>
      <ul>
        {lots.map((lot) => (
          <LotListItem
            key={lot.id}
            title={lot.title}
            city={lot.city}
     
            url={lot.images}
            logedin={logedin} 
         
          />
        ))}
      </ul>
    </article>
 )
}

export default Owner;
