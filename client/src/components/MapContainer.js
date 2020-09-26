import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const MapContainer = () => {
  
  const mapStyles = {        
    height: "70vh",
    width: "70%"};
  
  const defaultCenter = {
    lat: 49.2462, lng: -123.1162
  }
  
  return (
     <LoadScript
       googleMapsApiKey='AIzaSyAyesbQMyKVVbBgKVi2g6VX7mop2z96jBo'>
        <GoogleMap
          mapContainerStyle={mapStyles}
          zoom={13}
          center={defaultCenter}
        />
     </LoadScript>
  )
}
export default MapContainer;