import React, { useState } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import Geocoder from 'hooks/Geocoder';

const MapContainer = () => {

  const [ selected, setSelected ] = useState({});
  
  const onSelect = item => {
    setSelected(item);
  }


  const locations = [
    {
      name: "2100 208 Street",
      location: { 
        lat: 49.140780,
        lng: -122.650860
      },
    },
    {
      name: "21479 Smith Crescent",
      location: { 
        lat: 49.1329347,
        lng: -122.6294548
      },
    },
    {
      name: "5910 216 St",
      location: { 
        lat: 49.109517,
        lng: -122.6260083
      },
    }
  ];

  const mapStyles = {        
    height: "100vh",
    width: "100%"};
  
  const defaultCenter = {
    lat: 49.1329347, lng: -122.6294548
  }
  
  return (
    <LoadScript
    googleMapsApiKey='AIzaSyAyesbQMyKVVbBgKVi2g6VX7mop2z96jBo'>
     <GoogleMap
          mapContainerStyle={mapStyles}
          zoom={11}
          center={defaultCenter}>
        {
            locations.map(item => {
              return (
              <Marker key={item.name} 
                position={item.location}
                onClick={() => {
                  onSelect(item)
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
              <p>{selected.name}</p>
            </InfoWindow>
            )
         }
     </GoogleMap>
  </LoadScript>
  )
}
export default MapContainer;