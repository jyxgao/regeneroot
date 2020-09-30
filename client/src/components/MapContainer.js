import React, { useState, useCallback } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import Geocoder from 'hooks/Geocoder';

const MapContainer = (props) => {

  const [map, setMap] = useState(null)

  //set selected state for markers
  const [ selectedLot, setSelectedLot ] = useState({});
  
  const onSelect = lotItem => {
    setSelectedLot(lotItem);
  }

  //google maps window size
  const mapStyles = {        
    height: "60vh",
    width: "45%"};

  //sets map view bounds for list of queried lots
  const onLoad = function(map) {
      const bounds = new window.google.maps.LatLngBounds();
      for (let lot of props.lots) {
        console.log("lot location in map component: ", lot.location);
        bounds.extend (lot.location);        
      }
      map.fitBounds (bounds);
      console.log(map);
    setMap(map)
  }
 
  const onUnmount = useCallback(function callback(map) {
    setMap(null)
  }, [])

  //centers map on list of queried lots
  const mapCenter = function(lots) {
    const centerResult= {lat: lots[0].location.lat, lng: lots[0].location.lng};
    for (let lot of lots) {
      centerResult.lat = (lot.location.lat + centerResult.lat)/2
      centerResult.lng = (lot.location.lng + centerResult.lng)/2
    }
    return centerResult;
  }



  if (!props.lots.length) {
    //can return loading icon istead
    return null;
  }

  return (
    <LoadScript
    //must have working key
    googleMapsApiKey= {process.env.REACT_APP_GOOGLE_API_KEY}>
     <GoogleMap
          //map setup
          mapContainerStyle={mapStyles}
          zoom={11}
          center={mapCenter(props.lots)}
          onLoad={onLoad}
          onUnmount={onUnmount}>
          
        {
            //markers creation
            props.lots.map(lotItem => {
              return (
              <Marker key={lotItem.title} 
                position={lotItem.location}
                onClick={() => {
                onSelect(lotItem)
                }}
              />
              )
            })
         }
        {
            selectedLot.location && 
            (
              //info window upon selection, close on "x" click
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