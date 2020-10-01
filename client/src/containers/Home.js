import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import SmallLotItem from "../components/Lot/SmallLotItem";
import MapContainer from "../components/MapContainer";
import { SearchInput, Spinner, Pane } from "evergreen-ui";
import { Redirect } from 'react-router-dom'; 

const Home = () => {
  const [enteredCity, setEnteredCity] = useState("");
  const [enteredMinSize, setEnteredMinSize] = useState("");
  const [enteredMaxSize, setEnteredMaxSize] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [searchView, setSearchView] = useState(false);
  const [state, setState] = useState({
    lots: [],
    user: {},
    owned: [],
    leased: [],
  });

  const inputRef = useRef("");

  useEffect(() => {
    Promise.all([
      axios.get("/api/lots"),
      axios.get("/users/me"),
      axios.get("/api/lots/owned"),
      axios.get("/api/lots/leased"),
    ]).then((response) => {
      setSearchView(false);
      setState((prev) => ({
        ...prev,
        lots: response[0].data,
        user: response[1].data,
        owned: response[2].data,
        leased: response[3].data,
      }));
    });
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      let query = "?";
      if (enteredCity.length > 0) {
        setIsLoading(true);
        query += `city=${enteredCity}&`;
      }
      if (enteredMinSize.length > 0) {
        setIsLoading(true);
        query += `minimum_size=${enteredMinSize}&`;
      }
      if (enteredMaxSize.length > 0) {
        setIsLoading(true);
        query += `maximum_size=${enteredMaxSize}&`;
      }

      axios.get("/api/lots/search" + query).then((response) => {
        setIsLoading(false);
        setSearchView(true);
        setState((prev) => ({
          ...prev,
          lots: response.data,
        }));
      });
    }, 1000);
    // clean up timer before next run
    return () => {
      clearTimeout(timer);
    };
  }, [enteredCity, enteredMinSize, enteredMaxSize, inputRef]);

  // if (redirect) {
  //   return (<Redirect to={state.redirect})
  // }

  return (
    <main className="home--layout">
      <Pane>
        <nav className="navbar"></nav>
      </Pane>
      <Pane display="flex"
            flexDirection="row"
            justifyContent="center"
            padding={50}
      >
        <div className="search-item--city">
          <SearchInput
            ref={inputRef}
            placeholder="City name..."
            value={enteredCity}
            onChange={(e) => setEnteredCity(e.target.value)}
          />
        </div>
        <div className="search-item--minsize">
          <SearchInput
            ref={inputRef}
            placeholder="Min lot size in sqft"
            value={enteredMinSize}
            onChange={(e) => setEnteredMinSize(e.target.value)}
          />
        </div>
        <div className="search-item--maxsize">
          <SearchInput
            ref={inputRef}
            placeholder="Max lot size in sqft"
            value={enteredMaxSize}
            onChange={(e) => setEnteredMaxSize(e.target.value)}
          />
        </div>
        {isLoading && (
          <Pane
            display="flex"
            alignItems="center"
            justifyContent="center"
            height={200}
          >
            <Spinner />
          </Pane>
        )}
      </Pane>
    
      <Pane display="flex" flexDirection="row" flexWrap="wrap">
        {state.lots.map((lot) => {
          return (
            <SmallLotItem
              key={lot.id}
              imageUrls={lot.images}
              title={lot.title}
              city={lot.city}
            />
          );
        })}
      </Pane>

      {/* {searchView ? return (<div className="maplist-view--map-container">
          <MapContainer lots={state.lots} />
        </div>)} */}
    </main>
  );
};

export default Home;
