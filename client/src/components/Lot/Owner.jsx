import React, { useState, useEffect } from "react";
import axios from "axios";
import LotListItem from "./SmallLotItem";
import useVisualMode from '../../hooks/useVisualMode';


// const Owner = (props) => {

  // //note for Jenny: come from initial page load as state.lots should get passed down here
  // const [lots, setLots] = useState([])
  // //note for Jenny: hard coded state need to come from parent/top level, will work on next
  // const [isLoggedin, setIsLoggedin] = useState(true)

  // //note for Jenny: this should be in state.owned and passed from parent
  // useEffect (() => {
  //   axios.get('/api/lots/owned')
  //   .then((results) => {
  //     console.log("please show me some,", results.data)
  //     setLots(results.data )
  //   })},
  //   [])

  // return(
  //   <article>
  //     <ul>
  //       {lots.map((lot) => (
  //         <LotListItem
  //           key={lot.id}
  //           title={lot.title}
  //           city={lot.city}
  //           url={lot.images}
  //           isLoggedin={isLoggedin}
  //         />
  //       ))}
      // </ul>
    // </article>
//  )
// }

// export default Owner;
