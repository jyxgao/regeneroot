import React from 'react';
import './App.css';
import MapContainer from "components/MapContainer";

import Form from './components/ui/Form';
import LotList from './components/ui/LotList';
import SearchBar from './components/ui/SearchBar';
import Error from './components/ui/Error'
function App() {
  return (
    <main>
    <div className="App">
      Hello World! This is a change. Here we gosdfdfs
      {/* <LotListItem /> */}
      {/* <ImgList /> */}
      {/* <Form /> */}
      <Error />
    </div>
      <MapContainer/> 
    </main>
  );
}

export default App;
