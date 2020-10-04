import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import MapContainer from "../components/MapContainer";
import SmallLotItem from "../components/Lot/SmallLotItem";
import "./MapList.css";
import { SearchInput, Spinner, Pane } from "evergreen-ui";

const MapList = (props) => {
  const [enteredCity, setEnteredCity] = useState("");
  const [enteredMinSize, setEnteredMinSize] = useState("");
  const [enteredMaxSize, setEnteredMaxSize] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const inputRef = useRef("");
  const { state, setState } = props;

  // const setLot = (lot) => {
  //   setState((prev) => ({
  //     ...prev,
  //     lot: lot,
  //   }));
  //   console.log(state.lot);
  // };
  const isEmpty = (obj) => {
    for (const lot in obj) {
      if (obj.hasOwnProperty(lot)) return false;
    }
    return true;
  };

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
    return () => {
      clearTimeout(timer);
    };
  }, [enteredCity, enteredMinSize, enteredMaxSize, inputRef]);

  return (
    <main className="maplist-view">
      <section className="maplist-view--searchbar">
        <Pane
          display="flex"
          flexDirection="row"
          justifyContent="center"
          padding={50}
          position="fixed"
          zIndex={1}
          width="100%"
          backgroundColor="#FFFFFF"
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
      </section>
      <section className="maplist-view--content">
        <Pane display="flex" flexDirection="column" paddingTop={150} marginRight="50%">
        {!isEmpty(state.selectedLot) &&
        
        <SmallLotItem
          key={state.selectedLot.id}
          id={state.selectedLot.id}
          imageUrls={state.selectedLot.images}
          title={state.selectedLot.title}
          city={state.selectedLot.city}
          costPerMonth={state.selectedLot.cost_per_month}
          description={state.selectedLot.lot_description}
          // lotOwnerStatus={state.lotOwnerStatus[state.selectedLot.id]}
        />
        
        }
        <Pane className="small-lot--list">
          {state.lots.map((lot) => {
            const lotOwnerStatus = state.lotsOwnerStatus[lot.id];
            return (
              <SmallLotItem
                key={lot.id}
                id={lot.id}
                imageUrls={lot.images}
                title={lot.title}
                city={lot.city}
                costPerMonth={lot.cost_per_month}
                description={lot.lot_description}
                lotOwnerStatus={lotOwnerStatus}
              />
            );
          })}
        </Pane>
        </Pane>
        <div className="maplist-view--map-container">
          <MapContainer lots={state.lots} state={state} setState={setState} />
        </div>
      </section>
    </main>
  );
};

export default MapList;
