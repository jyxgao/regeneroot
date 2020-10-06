import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import LotTile from "../components/Lot/LotTile";
// import MapContainer from "../components/MapContainer";
import { SearchInput, Text, TextInput, Spinner, Pane } from "evergreen-ui";
// import { Redirect } from "react-router-dom";
import "./Home.css";

const Home = (props) => {
  const [enteredCity, setEnteredCity] = useState("");
  const [enteredCountry, setEnteredCountry] = useState("");
  const [enteredMinSize, setEnteredMinSize] = useState("");
  const [enteredMaxSize, setEnteredMaxSize] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const inputRef = useRef("");

  const { state, setState } = props;

  useEffect(() => {
    const timer = setTimeout(() => {
      let query = "?";
      if (enteredCity.length > 0) {
        setIsLoading(true);
        query += `city=${enteredCity}&`;
      }
      if (enteredCountry.length > 0) {
        setIsLoading(true);
        query += `country=${enteredCountry}&`;
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
  }, [enteredCity, enteredCountry, enteredMinSize, enteredMaxSize, inputRef]);

  return (
    <Pane
      className="home--layout"
      display="flex"
      justifyContent="center"
      marginLeft={100}
    >
      <Pane
        display="flex"
        flexDirection="column"
        justifyContent="center"
        padding={50}
        paddingTop={150}
        paddingLeft="10%"
        height={450}
        position="fixed"
        zIndex={1}
        width="100%"
        className="home--search"
        // backgroundColor="#FFFFFF"
        // borderBottom={10}
      >
        <Text
          fontFamily="Poppins"
          color="#FFFFFF"
          fontSize={25}
          paddingBottom={15}
        >
          Build your next food garden at...
        </Text>
        <Pane>
          <SearchInput
            className="search-item--city"
            ref={inputRef}
            placeholder="City name..."
            value={enteredCity}
            width={200}
            onChange={(e) => setEnteredCity(e.target.value)}
          />
          <TextInput
            className="search-item--country"
            ref={inputRef}
            placeholder="Country name..."
            value={enteredCountry}
            width={150}
            onChange={(e) => setEnteredCountry(e.target.value)}
          />

          <TextInput
            className="search-item--minsize"
            ref={inputRef}
            placeholder="Min lot size in sqft"
            value={enteredMinSize}
            width={150}
            onChange={(e) => setEnteredMinSize(e.target.value)}
          />

          <TextInput
            className="search-item--maxsize"
            ref={inputRef}
            placeholder="Max lot size in sqft"
            value={enteredMaxSize}
            width={150}
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
              id={lot.id}
              imageUrls={lot.images}
              title={lot.title}
              city={lot.city}
              description={lot.description}
              costPerMonth={lot.cost_per_month}
            />
          );
        })}
      </Pane>
    </Pane>
  );
};

export default Home;
