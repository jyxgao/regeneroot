import React from 'react';
import './App.css';
import MapContainer from "components/MapContainer";
import useInitializer from "hooks/Initializer";

import LotForm from './components/Lot/LotForm';
import LotList from './components/Lot/LotList';

//UI Tests
import Button from './components/UI/Button'

function App() {
  const {
    state
  } = useInitializer();

  return (
    <main>
    <div className="App">
      {/* <LotListItem /> */}
      {/* <ImgList /> */}
      {/* <Form /> */}
      {/* <LotList />
      <LotForm /> */}
      <Button />
    </div>
      {/* {console.log(state.lots)} */}
      {/* <MapContainer lots={state.lots}/>  */}
    </main>
  );
}

export default App;
