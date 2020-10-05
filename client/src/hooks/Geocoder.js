import React, { useState, setState, useEffect } from "react";
import axios from "axios"; 
 
 //GEOCODING
  //https://maps.googleapis.com/maps/api/geocode/json?parameters
  //example address address=24%20Sussex%20Drive%20Ottawa%20ON
  //Format plus codes as shown here (plus signs are url-escaped to %2B and spaces are url-escaped to %20):
//   global code is a 4 character area code and 6 character or longer local code (849VCWC8+R9 is 849VCWC8%2BR9).
// compound code is a 6 character or longer local code with an explicit location (CWC8+R9 Mountain View, CA, USA is CWC8%2BR9%20Mountain%20View%20CA%20USA).
//RESPONSE: https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=YOUR_API_KEY
//PARSE the response above
//RESULTS are in a (JSON) array



export default function Geocoder(lotObj) {

  const [state, setState] = useState({
    lots: [],
  });

  // const lotObj = {
  //   "id": 5,
  //   "owner_id": 4,
  //   "title": "Northland",
  //   "size": 458,
  //   "cost_per_month": "33.00",
  //   "is_irrigated": false,
  //   "suggested_term": 18,
  //   "condition_rating": 4,
  //   "available_date": "2020-08-10T00:00:00.000Z",
  //   "lot_type": "commercial",
  //   "lot_description": "In hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.",
  //   "is_leased": true,
  //   "street_address": "1903 Parsons Rd NW",
  //   "city": "Edmonton",
  //   "country": "Canada",
  //   "post_code": "T6N1H5",
  //   "lat": null,
  //   "long": null,
  //   "created_at": "2020-07-10T00:00:00.000Z",
  //   "is_active": false,
  //   "lot_id": 5,
  //   "image_url": "http://dummyimage.com/131x145.jpg/dddddd/000000"
  // }
  
  const APIkey = process.env.REACT_APP_GOOGLE_API_KEY;
  
  const addressString = function(lotObj) {
    const addressEsc = encodeURI(lotObj.street_address + " " + lotObj.city + " " + lotObj.country + " " + lotObj.post_code);
    // console.log(addressEsc);
    const geoRequestStr = `https://maps.googleapis.com/maps/api/geocode/json?address=${addressEsc}&key=${APIkey}`;
    // console.log(geoRequestStr);
    return geoRequestStr;
  }

  useEffect(() => {
    axios.get(addressString(lotObj))
      .then((geoObj) => {
        // debugger
        // console.log(geoObj);
      setState(prev => ({ ...prev, lat: {...geoObj.data.results[0].geometry.location.lat}, prev, long: {...geoObj.data.results[0].geometry.location.lng}}));
    });
  }, []);
  return {state};
}













// const address = lotObj.street_address + " " + lotObj.city + " " + lotObj.country + " " + lotObj.post_code

// function getLatLong(address) {
//   const geocoder = new google.maps.Geocoder();
//   const result = "";
//   geocoder.geocode( { 'address': address}, function(results, status) {
//        if (status == google.maps.GeocoderStatus.OK) {
//            result[lat] = results[0].geometry.location.Pa;
//            result[lng] = results[0].geometry.location.Qa;
//        } else {
//            result = "Unable to find address: " + status;
//        }
//        storeResult(result);
//       });
//   }
// }

// function getLatLong(address) {
//   const geocoder = new window.google.maps.Geocoder();
//   const result = "";
//   geocoder.geocode( { 'address': address, 'region': 'uk' }, function(results, status) {
//        if (status == google.maps.GeocoderStatus.OK) {
//            result[lat] = results[0].geometry.location.Pa;
//            result[lng] = results[0].geometry.location.Qa;
//        } else {
//            result = "Unable to find address: " + status;
//        }
//        storeResult(result);
//       });
//   }


// {
//   "results" : [
//      {
//         "address_components" : [
//            {
//               "long_name" : "1600",
//               "short_name" : "1600",
//               "types" : [ "street_number" ]
//            },
//            {
//               "long_name" : "Amphitheatre Pkwy",
//               "short_name" : "Amphitheatre Pkwy",
//               "types" : [ "route" ]
//            },
//            {
//               "long_name" : "Mountain View",
//               "short_name" : "Mountain View",
//               "types" : [ "locality", "political" ]
//            },
//            {
//               "long_name" : "Santa Clara County",
//               "short_name" : "Santa Clara County",
//               "types" : [ "administrative_area_level_2", "political" ]
//            },
//            {
//               "long_name" : "California",
//               "short_name" : "CA",
//               "types" : [ "administrative_area_level_1", "political" ]
//            },
//            {
//               "long_name" : "United States",
//               "short_name" : "US",
//               "types" : [ "country", "political" ]
//            },
//            {
//               "long_name" : "94043",
//               "short_name" : "94043",
//               "types" : [ "postal_code" ]
//            }
//         ],
//         "formatted_address" : "1600 Amphitheatre Parkway, Mountain View, CA 94043, USA",
//         "geometry" : {
//            "location" : {
//               "lat" : 37.4224764,
//               "lng" : -122.0842499
//            },
//            "location_type" : "ROOFTOP",
//            "viewport" : {
//               "northeast" : {
//                  "lat" : 37.4238253802915,
//                  "lng" : -122.0829009197085
//               },
//               "southwest" : {
//                  "lat" : 37.4211274197085,
//                  "lng" : -122.0855988802915
//               }
//            }
//         },
//         "place_id" : "ChIJ2eUgeAK6j4ARbn5u_wAGqWA",
//         "plus_code": {
//            "compound_code": "CWC8+W5 Mountain View, California, United States",
//            "global_code": "849VCWC8+W5"
//         },
//         "types" : [ "street_address" ]
//      }
//   ],
//   "status" : "OK"
// }