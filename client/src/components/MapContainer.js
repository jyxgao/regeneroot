import React, { useState } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import Geocoder from 'hooks/Geocoder';

const MapContainer = (lotsArr) => {

  const [ selected, setSelected ] = useState({});
  
  const onSelect = lotItem => {
    setSelected(lotItem);
  }


  const locations = [
    {
      title: "2100 208 Street",
        lat: 49.140780,
        long: -122.650860
    },
    {
      title: "21479 Smith Crescent",
        lat: 49.1329347,
        long: -122.6294548
    },
    {
      title: "5910 216 St",
        lat: 49.109517,
        long: -122.6260083
    }
  ];

  const mapStyles = {        
    height: "100vh",
    width: "100%"};
  
  const center = {
    lat: -3.745,
    lng: -38.523
  };

  const mapCenter = function() {
    const centerResult= {lat: 0, lng: 0};
    for (let lot in lots) {

    }
  }
  
  return (
    <LoadScript
    googleMapsApiKey='AIzaSyCjqFrGN1SaG-eVnBng96yWxwUnZFWFTjw'>
     <GoogleMap
          mapContainerStyle={mapStyles}
          zoom={11}
          center={mapCenter}>
        {
            locations.map(lotItem => {
              return (
              <Marker key={lotItem.title} 
                position={lotItem.location}
                onClick={() => {
                  onSelect(lotItem)
                  Geocoder()
                }}
              />
              )
            })
         }
        {
            selected.location && 
            (
              <InfoWindow
              position={selected.location}
              clickable={true}
              onCloseClick={() => setSelected({})}
            >
              <p>{selected.title}</p>
            </InfoWindow>
            )
         }
     </GoogleMap>
  </LoadScript>
  )
}
export default MapContainer;