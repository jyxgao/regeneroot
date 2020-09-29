import React, { useState, useCallback } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import Geocoder from 'hooks/Geocoder';

const MapContainer = (props) => {

  const [map, setMap] = React.useState(null)

  const [ selectedLot, setSelectedLot ] = useState({});
  
  const onSelect = lotItem => {
    setSelectedLot(lotItem);
  }

  const lots = props.lots

  // console.log(props.lots);
  // const bounds = new window.google.maps.LatLngBounds();
  // console.log(bounds);
  // debugger

  const onLoad = function(map) {
      // console.log("onLoad was Called!!!")
      // console.log(props.lots);
      // debugger
      const bounds = new window.google.maps.LatLngBounds();
      for (let lot of props.lots) {
        console.log("lot location in map component: ", lot.location);
        bounds.extend (lot.location);        
      }
      map.fitBounds (bounds);
      console.log(map);
    setMap(map)
  }

  // const onLoad = useCallback(function callback(map) {
  //     console.log("onLoad was Called!!!")
  //     console.log(props.lots);
  //     const bounds = new window.google.maps.LatLngBounds();
  //     for (let lot of props.lots) {
  //       console.log("lot location in map component: ", lot.location);
  //       bounds.extend (lot.location);        
  //     }
  //     map.fitBounds (bounds);
  //   setMap(map)
  // }, [])
 
 
  const onUnmount = useCallback(function callback(map) {
    setMap(null)
  }, [])

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



  if (!props.lots.length) {
    //can return loading icon istead
    return null;
  }

  return (
    <LoadScript
    googleMapsApiKey= {process.env.REACT_APP_GOOGLE_API_KEY}>
     <GoogleMap
          mapContainerStyle={mapStyles}
          zoom={11}
          center={mapCenter(props.lots)}
          onLoad={onLoad}
          onUnmount={onUnmount}>
            
        {
            props.lots.map(lotItem => {
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

  // const locations = [
  //   {
  //     title: "2100 208 Street",
  //     location: {lat: 49.140780,
  //       lng: -122.650860}
        
  //   },
  //   {
  //     title: "21479 Smith Crescent",
  //     location: {lat: 49.1329347,
  //       lng: -122.6294548}
  //   },
  //   {
  //     title: "5910 216 St",
  //     location: {lat: 49.109517,
  //     lng: -122.6260083}
  //   }
  // ];