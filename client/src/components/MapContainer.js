import React, { useState } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import Geocoder from 'hooks/Geocoder';

const MapContainer = () => {

  const [ selectedLot, setSelectedLot ] = useState({});
  
  const onSelect = lotItem => {
    setSelectedLot(lotItem);
  }


  const locations = [
    {
      title: "2100 208 Street",
      location: {lat: 49.140780,
        lng: -122.650860}
        
    },
    {
      title: "21479 Smith Crescent",
      location: {lat: 49.1329347,
        lng: -122.6294548}
    },
    {
      title: "5910 216 St",
      location: {lat: 49.109517,
      lng: -122.6260083}
    }
  ];

  const mapStyles = {        
    height: "100vh",
    width: "100%"};

    // const defaultCenter = {
    //   lat: 49.140780, lng: -122.650860
    // }


  const mapCenter = function(lots) {
    const centerResult= {lat: lots[0].location.lat, lng: lots[0].location.lng};
    for (let lot of lots) {
      centerResult.lat = (lot.location.lat + centerResult.lat)/2
      centerResult.lng = (lot.location.lng + centerResult.lng)/2
    }
    return centerResult;
  }

  
  let googleKey = `${process.env.GOOGLE_API_KEY}`
  console.log(googleKey);

  return (
    <LoadScript
    googleMapsApiKey= {process.env.GOOGLE_API_KEY}>
     <GoogleMap
          mapContainerStyle={mapStyles}
          zoom={11}
          center={mapCenter(locations)}>
        {
            locations.map(lotItem => {
              return (
              <Marker key={lotItem.title} 
                position={lotItem.location}
                onClick={() => {
                  onSelect(lotItem)
                  // Geocoder()
                }}
              />
              )
            })
         }
        {
            selectedLot.location && 
            (
              <InfoWindow
              position={selectedLot.location}
              clickable={true}
              onCloseClick={() => setSelectedLot({})}
            >
              <p>{selectedLot.title}</p>
            </InfoWindow>
            )
         }
     </GoogleMap>
  </LoadScript>
  )
}
export default MapContainer;