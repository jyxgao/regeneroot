import React, { useState } from "react";
import axios from "axios";

import { Button } from "evergreen-ui";
// import { data } from "cypress/types/jquery";

const APIkey = process.env.REACT_APP_GOOGLE_API_KEY;

const addressString = function (lotObj) {
  const addressEsc = encodeURI(
    lotObj.street_address +
      " " +
      lotObj.city +
      " " +
      lotObj.country +
      " " +
      lotObj.post_code
  );
  // console.log(addressEsc);
  const geoRequestStr = `https://maps.googleapis.com/maps/api/geocode/json?address=${addressEsc}&key=${APIkey}`;
  // console.log(geoRequestStr);
  return geoRequestStr;
};

const LotFormEdit = () => {

  const props = {
    "id": 5,
    "owner_id": 4,
    "title": "Northland",
    "size": 458,
    "rate": "33.00",
    "is_irrigated": false,
    "suggested_term": 18,
    "condition_rating": 4,
    "available_date": "2020-08-10T00:00:00.000Z",
    "lot_type": "commercial",
    "lot_description": "In hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.",
    "is_leased": true,
    "street_address": "1903 Parsons Rd NW",
    "city": "Edmonton",
    "country": "Canada",
    "post_code": "T6N1H5",
    "lat": null,
    "long": null,
    "created_at": "2020-07-10T00:00:00.000Z",
    "is_active": false,
    "lot_id": 5,
    "images": [
      "https://consumerist.com/consumermediallc.files.wordpress.com/2014/08/2047.png",
      "http://seanparnell.com/CALP/VacantLotEGP.jpg",
      "https://savetherain.us/wp-content/uploads/2012/10/Vacant-Lot-Putnam.jpg",
      "http://www.waterwinterwonderland.com/images/drivein/10/B%5EThe_empty_lot_next_to_store_photo_from_Water_Winter_Wonderland.jpg",
      "http://smartgrowth.org/wp-content/uploads/2015/08/lot.jpg"
      ],
      "location": {
      "lat": 49.13389,
      "lng": -122.62733
      },
      "logedin" : true
  }

  const [title, setTitle] = useState(props.title);
  const [size, setSize] = useState("");
  const [costPerMonth, setCostPerMonth] = useState("");
  const [isIrrigated, setIsIrrigated] = useState(false);
  const [term, setTerm] = useState("");
  const [rating, setRating] = useState("");
  const [availableDate, setAvailableDate] = useState("");
  const [type, setType] = useState("");
  const [lotDescription, setLotDescription] = useState("");
  const [isLeased, setIsleased] = useState(false);
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [postCode, setPostCode] = useState("");
  const created = new Date().toLocaleString().slice(0, 9);
  // const [photo, setPhoto] = React.useState([]); //??
  const lot = {
    title,
    size,
    costPerMonth,
    isIrrigated,
    term,
    rating,
    availableDate,
    type,
    lotDescription,
    isLeased,
    street,
    city,
    country,
    postCode,
    created,
  };
  function validate() {
    // console.log("{", title, size, costPerMonth, isIrrigated, term,rating, availableDate,  type, lotDescription, isLeased, street, city, country, postCode, created+ "}")
    console.log(lot);
    // props.onSave(lot)
    // onSave(title, size, costPerMonth, isIrrigated, term,rating, availableDate,  lotType, lotDescription, isLeased, street, city, country, postCode, created);
  }
  function handleInputIrrigateChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    setIsIrrigated(value);
  }

  function handleInputLeasedChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    setIsleased(value);
  }
  function handleSubmit(event) {
    axios
      .get(
        addressString({
          street_address: street,
          city,
          country,
          post_code: postCode,
        })
      )
      .then((data) => {
        const latResponse = data.data.results[0].geometry.location.lat;
        const longResponse = data.data.results[0].geometry.location.lng;
        console.log("lat:", latResponse);
        axios.post("/api/lots", {
          lat: latResponse,
          long: longResponse,
          title,
          size,
          cost_per_month: costPerMonth,
          is_irrigated: isIrrigated,
          suggested_term: term,
          condition_rating: rating,
          available_date: availableDate,
          lot_type: type,
          lot_description: lotDescription,
          is_leased: isLeased,
          street_address: street,
          city,
          country,
          post_code: postCode,
          is_active: true,
          images: [
            "https://www.google.com/url?sa=i&url=https%3A%2F%2Fcloudfour.com%2Fexamples%2Fimg-currentsrc%2F&psig=AOvVaw1mveMqKOFyRUQ6UYnN6T3W&ust=1601429150390000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCLDby8-ajewCFQAAAAAdAAAAABAD",
          ],
        });
      })
      // .then((res) => console.log(res.data))
      .catch((error) => console.log(error));

    event.preventDefault();
  }

  const edit = (id) => {
    return axios.get(`/api/lots/${id}`).then((results) => {
      console.log("please do some,", results.data);
      // setTitle(results.data.title )
    });
  };

  return (
    <section>
      <form autoComplete="off" onSubmit={handleSubmit}>
        <h1>Add New Lot</h1>
        <label>
          Title:
          <input
            name="title"
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </label>
        <br />
        <label>
          Size:
          <input
            name="size"
            type="text"
            value={size}
            onChange={(event) => setSize(event.target.value)}
          />
        </label>
        <br />
        <label>
          Cost Per-Month:
          <input
            name="Cost Per-Month:"
            type="text"
            value={costPerMonth}
            onChange={(event) => setCostPerMonth(event.target.value)}
          />
        </label>
        <br />
        <label>
          Is it irrigated:
          <input
            name="irrigated"
            type="checkbox"
            checked={isIrrigated}
            onChange={handleInputIrrigateChange}
          />
        </label>
        <br />
        <label>
          Term:
          <input
            name="term"
            type="text"
            value={term}
            onChange={(event) => setTerm(event.target.value)}
          />
        </label>
        <br />
        <label>
          Rating:
          <input
            name="term"
            type="text"
            value={rating}
            onChange={(event) => setRating(event.target.value)}
          />
        </label>
        <br />
        <label>
          Lot Type:
          <select
            name="type"
            type="text"
            value={type}
            onChange={(event) => setType(event.target.value)}
          >
            <option value="commercial">Commercial</option>
            <option value="Residential">residential</option>
          </select>
        </label>
        <br />
        <label>
          Lot description:
          <input
            name="descriptioin"
            type="text"
            value={lotDescription}
            onChange={(event) => setLotDescription(event.target.value)}
          />
        </label>
        <br />
        <label>
          Is it leased:
          <input
            name="isLeased"
            type="checkbox"
            checked={isLeased}
            onChange={handleInputLeasedChange}
          />
        </label>
        <br />
        <label>
          street:
          <input
            name="street"
            type="text"
            value={street}
            onChange={(event) => setStreet(event.target.value)}
          />
        </label>
        <br />
        <label>
          City:
          <input
            name="city"
            type="text"
            value={city}
            onChange={(event) => setCity(event.target.value)}
          />
        </label>
        <br />
        <label>
          country:
          <input
            name="country"
            type="text"
            value={country}
            onChange={(event) => setCountry(event.target.value)}
          />
        </label>
        <br />
        <label>
          Post Code:
          <input
            name="post code"
            type="text"
            value={postCode}
            onChange={(event) => setPostCode(event.target.value)}
          />
        </label>
        <br />
        <label>
          Available Date:
          <input
            name="Available Date"
            type="date"
            value={availableDate}
            onChange={(event) => setAvailableDate(event.target.value)}
          />
        </label>
        <br />
        {/* <label>
          Date:
          {created}
        </label> */}
        <br />
        {/* <label>
          photo:
            <input name="photo" type="file" value={photo} multiple onChange={handlePhotoUpload} />  
            {/* for the photo only can print document content but can not grab data into the object now */}
        {/* </label> */}

        <Button onClick={handleSubmit}>Submit</Button>
      </form>
    </section>
  );
};

export default LotFormEdit;
