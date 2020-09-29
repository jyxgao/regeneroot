import React, { useState, setState, useEffect } from "react";
import axios from "axios"; 

export default function useInitializer() {

  const [state, setState] = useState({
    leases: [],
    lots: []
  });
  
  //Initialize all data from database into state
  useEffect(() => {
    axios.get("/api/lots")
      .then((res) => {
      setState(prev => ({ ...prev, lots: [...res.data.data]}));
      })
  }, []);

  return {state}
}