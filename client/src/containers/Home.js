import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import LotTile from "../components/Lot/LotTile";
// import MapContainer from "../components/MapContainer";
import { SearchInput, Spinner, Pane } from "evergreen-ui";
// import { Redirect } from "react-router-dom";

const Home = (props) => {
  const [enteredCity, setEnteredCity] = useState("");
  const [enteredMinSize, setEnteredMinSize] = useState("");
  const [enteredMaxSize, setEnteredMaxSize] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const inputRef = useRef("");

  const {state, setState} = props;

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

  return (
    <main className="home--layout">
      <Pane
        display="flex"
        flexDirection="row"
        justifyContent="center"
        padding={50}
        paddingTop={200}
      >
        <Pane className="search-item--city">
          <SearchInput
            ref={inputRef}
            placeholder="City name..."
            value={enteredCity}
            zIndex={-1}
            onChange={(e) => setEnteredCity(e.target.value)}
          />
        </Pane>
        <Pane className="search-item--minsize">
          <SearchInput
            ref={inputRef}
            placeholder="Min lot size in sqft"
            value={enteredMinSize}
            zIndex={-1}
            onChange={(e) => setEnteredMinSize(e.target.value)}
          />
        </Pane>
        <Pane className="search-item--maxsize">
          <SearchInput
            ref={inputRef}
            placeholder="Max lot size in sqft"
            value={enteredMaxSize}
            zIndex={-1}
            onChange={(e) => setEnteredMaxSize(e.target.value)}
          />
        </Pane>
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

      <Pane paddingTop={500} display="flex" flexDirection="row" flexWrap="wrap">
        {state.lots.map((lot) => {
          return (
            <LotTile
              key={lot.id}
              imageUrls={lot.images}
              title={lot.title}
              city={lot.city}
              costPerMonth={lot.cost_per_month}
            />
          );
        })}
      </Pane>
    </main>
  );
};

export default Home;
