import React from 'react';
import './App.css';
import MapContainer from "components/MapContainer";
import useInitializer from "hooks/Initializer";

import Form from './components/ui/Form';
import LotList from './components/ui/LotList';
import SearchBar from './components/ui/SearchBar';
import Error from './components/ui/Error'
function App() {
  const {
    state
  } = useInitializer();

  return (
    <main>
    <div className="App">
      Hello World! This is a change. Here we gosdfdfs
      {/* <LotListItem /> */}
      {/* <ImgList /> */}
      {/* <Form /> */}
      <Error />
    </div>
      {console.log(state.lots)}
      <MapContainer lots={state.lots}/> 
    </main>
  );
}

export default App;
