import React, { useState, useEffect, useReducer } from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import axios from "axios";
import "./App.css";
import NavBar from "./components/Header/NavBar";
import Footer from './components/Footer/Footer'
import Home from "./containers/Home";
import MapList from "./containers/MapList";
import LotDetail from "./containers/LotDetail";
import CreateLot from "./containers/CreateLot";
import LotFormEdit from "./components/Lot/LotFormEdit";
import EditLot from "./containers/EditLot";

const App = () => {
  const [state, setState] = useState({
    lots: [],
    user: {},
    owned: [],
    leased: [],
    lotsOwnerStatus: {},
  });

  useEffect(() => {
    Promise.all([
      axios.get("/api/lots"),
      axios.get("/users/me"),
      axios.get("/api/lots/owned"),
      axios.get("/api/lots/leased"),
    ]).then(
      ([{ data: lots }, { data: user }, { data: owned }, { data: leased }]) => {
        let lotsOwnerStatus = {};
        if (lots) {
          lots.forEach((lot) => {
            lotsOwnerStatus[lot.id] = null;
          });
        }
        if (owned) {
          owned.forEach((lot) => {
            lotsOwnerStatus[lot.id] = "owned";
          });
        }
        if (leased) {leased.forEach((lot) => {
          lotsOwnerStatus[lot.id] = "leased";
        })};

        setState((prev) => ({
          ...prev,
          lots,
          user,
          owned,
          leased,
          lotsOwnerStatus,
        }));
      }
    );
  }, []);

  return (
    <div className="App">
      <Router>
        <NavBar user={state.user}/>
        <Switch>
          <Route path="/lot/:id">
            <LotDetail state={state} setState={setState} />
          </Route>
           <Route path="/edit">
            <LotFormEdit/>
          </Route>
          <Route path="/mapview">
            <MapList
              state={state}
              setState={setState}
            />
          </Route>
          <Route path="/new">
            <CreateLot />
          </Route>
          <Route path="/">
            <Home
              state={state}
              setState={setState}
            />
          </Route>
        </Switch>
        <Footer />
      </Router>
    </div>
  );
};

export default App;
