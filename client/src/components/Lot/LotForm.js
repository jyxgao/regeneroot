import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import {
  Button,
  Pane,
  TextInput,
  Textarea,
  Checkbox,
  Select,
} from "evergreen-ui";
import "./LotForm.css";

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

const LotForm = (props) => {
  const [title, setTitle] = useState("");
  const [size, setSize] = useState(0);
  const [costPerMonth, setCostPerMonth] = useState(0);
  const [isIrrigated, setIsIrrigated] = useState(false);
  const [term, setTerm] = useState(0);
  const [rating, setRating] = useState(0);
  const [availableDate, setAvailableDate] = useState("");
  const [type, setType] = useState("");
  const [lotDescription, setLotDescription] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [postCode, setPostCode] = useState("");
  const [image, setImage] = useState("");
  const [images, setImages] = useState([]);

  const handleImages = (e) => {
    e.preventDefault();
    images.push(image);
    setImages(images);
    setImage("");
  };
  const history = useHistory();
  const handleSubmit = (event) => {
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
        axios
          .post("/api/lots", {
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
            // is_leased: isLeased,
            street_address: street,
            city,
            country,
            post_code: postCode,
            is_active: true,
            images: images,
          })
          .then((res) => {
            setTitle("");
            setSize(0);
            setCostPerMonth(0);
            setIsIrrigated(false);
            setTerm(0);
            setRating(0);
            setAvailableDate("");
            setType("");
            setLotDescription("");
            setStreet("");
            setCity("");
            setCountry("");
            setPostCode("");
            setImage("");
            setImages([]);
          });
        let path = `/`;
        history.push(path);
      })
      .catch((error) => console.log(error));

    event.preventDefault();
  };

  return (
    <Pane className="lot-form--new" display="flex">
      <Pane display="flex" flexDirection="column" justifyContent="center">
        <h2 className="heading--post-lot">Post Your Vacant Lot</h2>
        <label>Title: </label>
        <TextInput
          marginTop={10}
          label="Title: "
          name="title"
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
        <br />
        <label>Size: </label>
        <TextInput
          marginTop={10}
          name="size"
          type="text"
          value={size}
          onChange={(event) => setSize(event.target.value)}
        />
        <br />
        <label>Cost Per Month: </label>
        <TextInput
          marginTop={10}
          name="cost_per_month"
          type="text"
          value={costPerMonth}
          onChange={(event) => setCostPerMonth(event.target.value)}
        />
        <br />
        <label>Term in Months: </label>
        <TextInput
          marginTop={10}
          name="term"
          type="text"
          value={term}
          onChange={(event) => setTerm(event.target.value)}
        />
        <br />
        <label>Rating: </label>
        <TextInput
          marginTop={10}
          name="term"
          type="text"
          value={rating}
          onChange={(event) => setRating(event.target.value)}
        />
        <br />
        <label>Lot Type: </label>
        <Select
          marginTop={10}
          width="40%"
          name="lot_type"
          value={type}
          onChange={(event) => setType(event.target.value)}
        >
          <option value="Select an option">Select an option</option>
          <option value="Commercial">Commercial</option>
          <option value="Residential">Residential</option>
        </Select>
          <Checkbox
            label="Is it irrigated"
            name="is_irrigated"
            type="checkbox"
            checked={isIrrigated}
            onChange={(e) => setIsIrrigated(e.target.checked)}
          />
        <br />
        <label>Lot Description: </label>
        <Textarea
          marginTop={10}
          name="description"
          placeholder="Write a description for your lot..."
          width={750}
          value={lotDescription}
          onChange={(event) => setLotDescription(event.target.value)}
        />
        <br />
        <label>Street: </label>
        <TextInput
          marginTop={10}
          name="street"
          type="text"
          value={street}
          onChange={(event) => setStreet(event.target.value)}
        />
        <br />
        <label>City: </label>
        <TextInput
          marginTop={10}
          name="city"
          type="text"
          value={city}
          onChange={(event) => setCity(event.target.value)}
        />
        <br />
        <label>Country: </label>
        <TextInput
          marginTop={10}
          name="country"
          type="text"
          value={country}
          onChange={(event) => setCountry(event.target.value)}
        />
        <br />
        <label>Post Code: </label>
        <TextInput
          marginTop={10}
          name="post_code"
          type="text"
          value={postCode}
          onChange={(event) => setPostCode(event.target.value)}
        />

        <br />
        <label>Available Date: </label>
        <TextInput
          marginTop={10}
          name="available_date"
          type="date"
          value={availableDate}
          onChange={(event) => setAvailableDate(event.target.value)}
        />
        <br />
        <div className="lot-form--add-img">
          <label>Add an image url: </label>
          <br />
          <TextInput
            marginTop={10}
            name="image_url"
            type="text"
            value={image}
            onChange={(event) => setImage(event.target.value)}
          />
          <Button
            className="button--add-image"
            fontFamily="Poppins"
            margin={5}
            onClick={handleImages}
          >
            add image
          </Button>
        </div>
        <div>
          <Button
            className="button--submit"
            fontFamily="Poppins"
            type="submit"
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </div>
      </Pane>
    </Pane>
  );
};

export default LotForm;
