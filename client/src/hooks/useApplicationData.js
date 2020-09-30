import { useState, useEffect } from "react";
import axios from "axios";

const useApplicationData = () => {
  //get all lots by most recent, logged in user info
    const [state, setState] = useState({
      lots: [],
      user: {},
    });

    useEffect(() => {
      Promise.all([axios.get("/api/lots"), axios.get("/users/me")]).then(
        (response) => {
          setState((prev) => ({
            lots: response[0].data,
            user: response[1].data,
          }));
        }
      );
    }, []);

  
  
  const createNewLot = () => {

  }

  const updateLot = () => {

  }

  const deleteLot = () => {

  }


};

export default useApplicationData;
