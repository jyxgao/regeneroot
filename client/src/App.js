import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";
import axios from "axios";
import "./App.css";
import NavBar from "./components/Header/NavBar";
import Footer from "./components/Footer/Footer";
import Home from "./containers/Home";
import MapList from "./containers/MapList";
import LotDetail from "./containers/LotDetail";
import CreateLot from "./containers/CreateLot";
import Login from "./containers/Login";
import { css } from "@emotion/core";
import BeatLoader from "react-spinners/BeatLoader";

const App = () => {
  const override = css`
    display: block;
    margin: 0 auto;
    padding: 200px 400px 0 400px;
    color: #2ec4b6;
  `;
  const [state, setState] = useState({
    selectedLot: {},
    lots: [],
    user: {},
    owned: [],
    leased: [],
    lotsOwnerStatus: {},
    isLoading: false,
    messages: [],
    loggedin: false,
  });

  
  useEffect(() => {
    setState({ isLoading: true });
    Promise.all([
      axios.get("/api/lots"),
      axios.get("/users/me"),
      axios.get("/api/lots/owned"),
      axios.get("/api/lots/leased"),
    ])
    .then(
      ([
        { data: lots },
        { data: user },
        { data: owned },
        { data: leased },
      ]) => {
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
        if (leased) {
          leased.forEach((lot) => {
            lotsOwnerStatus[lot.id] = "leased";
            });
          }
          
          setState((prev) => ({
            ...prev,
            lots,
            user,
            owned,
            leased,
            lotsOwnerStatus,
            isLoading: false,
            loggedin: user.email ? true : false,
          }));
        }
        )
        .catch((err) => console.log(err));
      }, []);
      
      const logout = () => {
        axios
        .post("/users/logout")
        .then((resolve) => {
          setState((prev) => ({ ...prev, user: {}, loggedin: false }));
        })
        .catch((err) => console.log(err));
      };
      
      const login = (email) => {
        return axios
      .post(`/users/login`, { email: email })
      .then((data) => {
        if (data.data.isLoggedIn) {
          //set user object
          setState((prev) => ({
            ...prev,
            loggedin: true,
            user: data.data.user,
          }));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="App">
      {state.isLoading === true ? (
        <BeatLoader css={override} size={50} color={"#D81159"} loading={true} />
      ) : (
        <Router>
          <NavBar
            user={state.user}
            logout={logout}
            loggedin={state.loggedin}
          />
          <Switch>
            <Route path="/lot/:id">
              <LotDetail state={state} setState={setState} />
            </Route>
            <Route path="/mapview">
              <MapList state={state} setState={setState} />
            </Route>
            <Route path="/new">
              <CreateLot />
            </Route>
            <Route path="/login">
              <Login user={state.user} login={login} />
            </Route>
            <Route path="/">
              <Home state={state} setState={setState} />
            </Route>
          </Switch>
          <Footer />
        </Router>
      )}
    </div>
  );
};

export default App;
