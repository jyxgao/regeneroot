import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import "./App.css";
import MapContainer from "components/MapContainer";
import useInitializer from "hooks/Initializer";
// import useApplicationData from "./hooks/useApplicationData";

import LotListItem from "./components/Lot/LotListItem";

//UI Tests
import { SearchInput, Spinner, Pane } from "evergreen-ui";

const App = () => {
  //searchterm state -> triggers axios.get
  //loading state -> boolean
  //dataobject state -> lot list

  const [enteredCity, setEnteredCity] = useState("");
  const [enteredMinSize, setEnteredMinSize] = useState("");
  const [enteredMaxSize, setEnteredMaxSize] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  // const [data, setData] = useState([]);
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
      //compare old search string with new string, if same, send http request

      // this is dependent on evergreen-ui library ^5.1.2
      // const inputValue = inputRef.current.children[1].value;
      // console.log(inputRef.current.children[1].value)
      // if (enteredCity === inputRef) {
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
    <main className="layout">
      <section>
        <nav className="navbar"></nav>
      </section>
      <section className="search">
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
      </section>
      <section className="feature">
        <div className="App">
          {/* <LotListItem /> */}
          {/* <ImgList /> */}
          {state.lots.map((lot) => {
            return (
              <LotListItem
                key={lot.id}
                title={lot.title}
                city={lot.city}
                lotDescription={lot.lot_description}
                imageUrls={lot.images}
              />
            );
          })}
          {/* <LotList /> */}
          {/* <LotForm /> */}
        </div>
        {/* {console.log(state.lots)} */}
        <MapContainer lots={state.lots} />
      </section>
    </main>
  );
};

export default App;
