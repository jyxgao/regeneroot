import React from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import axios from "axios";
import "./App.css";
import Home from "./containers/Home";
import MapList from "./containers/MapList";

const App = () => {
  return (
    <div className="App">
      <Router>
          <Route path="/">
            <Home />
          </Route>
          <Route path="/mapview">
            <MapList />
          </Route>
      </Router>
    </div>
  );
};

export default App;
