import React from "react";
import LotListItem from "./LotListItem";
import axios from "axios"

export default function LotList(props) {
  const [database, setDatabase] = React.useState([]);
  // const [state, setState] = React.useState({
  //   id: null,
  //   owner_id: null,
  //   title: "",
  //   size: null,
  //   cost_per_month: null,
  //   is_irrigated: false,
  //   suggested_term: null,
  //   condition_rating: null,
  //   available_date:"",
  //   lot_type: "",
  //   lot_description: "",
  //   is_leased: false,
  //   street_address: "",
  //   city: "",
  //   country: "",
  //   post_code: "",
  //   created_at:"",
  //   is_active: true

  // })

  React.useEffect(() => {
    axios.get('/api/lots')
    .then(res => {
      setDatabase(res.data.data)
    })
  }, [])
   
  
 return (
  <ul>
   {database.map((lot) => (
    <li>
      <LotListItem
          key={lot.id}
          name= {lot.title}
          lotDescription = {lot.lot_description}
          url={lot.images}
        />
    </li> 
    )
  )}
</ul>
 )
 


} 