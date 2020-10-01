import React from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import "./App.css";
import Home from "./containers/Home";
import MapList from "./containers/MapList";
import CreateLot from "./containers/CreateLot";
// import Owner from "components/Lot/Owner";


const App = () => {
  return (
    <div className="App">
      <Router>
        <Switch>
        {/* <Route path="/owner">
            <Owner />
          </Route> */}
          <Route path="/mapview">
            <MapList />
          </Route>
          <Route path="/new">
            <CreateLot />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
     
    </div>
  );
};

export default App;
