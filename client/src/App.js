import React from 'react';
import './App.css';
import MapContainer from "components/MapContainer";

import Form from './components/Lot/LotForm';
import LotList from './components/Lot/LotList';
// import SearchBar from './components/ui/SearchBar';
// import Error from './components/ui/Error'
function App() {
  return (
    <main>
    <div className="App">
      Hello World! This is a change. Here we gosdfdfs
      {/* <LotListItem /> */}
      {/* <ImgList /> */}
      {/* <Form /> */}
      <LotList />
    </div>
      <MapContainer/> 
    </main>
  );
}

export default App;
