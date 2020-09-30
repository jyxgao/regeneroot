import React, { useEffect } from "react";
import axios from "axios";
import LotListItem from "./LotListItem";

const LotList = (props) => {
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

  useEffect(() => {
    axios.get("/api/lots").then((res) => {
      setDatabase(res.data);
    });
  }, []);

  return (
    <ul>
      {database.map((lot) => (
        <LotListItem
          key={lot.id}
          name={lot.title}
          lotDescription={lot.lot_description}
          url={lot.images}
        />
      ))}
    </ul>
  );
};

export default LotList;
