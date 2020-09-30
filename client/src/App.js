import React from "react";
import "./App.css";
import MapContainer from "components/MapContainer";
import useInitializer from "hooks/Initializer";
import useApplicationData from "./hooks/useApplicationData";

import LotForm from "./components/Lot/LotForm";
import LotList from "./components/Lot/LotList";

import SearchBarItem from "./components/SearchBar/SearchBarItem";
//UI Tests
import { Button } from "evergreen-ui";

const App = () => {
  const { state } = useApplicationData();

  return (
    <main className="layout">
      <section>
        <nav className="navbar"></nav>
      </section>
      <section className="feature">
        <div className="App">
          <SearchBarItem />
          {/* <LotListItem /> */}
          {/* <ImgList /> */}
          <LotList />
          {/* <LotForm /> */}
        </div>
        {/* {console.log(state.lots)} */}
        <MapContainer lots={state.lots}/> 
      </section>
    </main>
  );
};

export default App;
