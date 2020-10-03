import React, { useState } from "react";
import axios from "axios";
import "./LotForm.css";
import { Button, TextInput, Textarea, Checkbox, Select } from "evergreen-ui";
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

const LotFormEdit = (props) => {

  console.log(props);

  const [title, setTitle] = useState(props.lot.title);
  const [size, setSize] = useState(props.lot.size);
  const [costPerMonth, setCostPerMonth] = useState(props.lot.cost_per_month);
  const [isIrrigated, setIsIrrigated] = useState(props.lot.is_irrigated);
  const [term, setTerm] = useState(props.lot.suggested_term);
  const [rating, setRating] = useState(props.lot.condition_rating);
  const [availableDate, setAvailableDate] = useState(props.lot.available_date);
  const [type, setType] = useState(props.lot.lot_type);
  const [lotDescription, setLotDescription] = useState(props.lot.lot_description);
  const [isLeased, setIsleased] = useState(props.lot.is_leased);
  const [street, setStreet] = useState(props.lot.street_address);
  const [city, setCity] = useState(props.lot.city);
  const [country, setCountry] = useState(props.lot.country);
  const [postCode, setPostCode] = useState(props.lot.post_code);
  const [image, setImage] = useState("");
  const [images, setImages] = useState(props.lot.images);


  const handleImages = (e) => {
    e.preventDefault();
    images.push(image);
    setImages(images);
    setImage("");
  };

  // function handleInputIrrigateChange(event) {
  //   const target = event.target;
  //   const value = target.type === "checkbox" ? target.checked : target.value;
  //   setIsIrrigated(value);
  // }

  // function handleInputLeasedChange(event) {
  //   const target = event.target;
  //   const value = target.type === "checkbox" ? target.checked : target.value;
  //   setIsleased(value);
  // }

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
          .post(`/api/lots/${props.lot.id}`, {
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
          .then(() => {
            axios.get(`/api/lots/${props.lot.id}`)  ////this part is what i am doing,
            .then( result => {
              console.log(result.data[0].title)
              setTitle(result.data[0].title)
              console.log("title", title)
            })
          })
          .then(() => {
            props.setIsEditing(false)
          })
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
          })
  
      //need to set state again here
      // .then((res) => console.log(res.data))
      .catch((error) => console.log(error));

      event.preventDefault();
   
    };


  const edit = (id) => {
    return axios.get(`/api/lots/${id}`).then((results) => {
      console.log("please do some,", results.data);
      // setTitle(results.data.title )
    });
  };

  return (
    <section>
      <form autoComplete="off">
        <h1>Edit Lot</h1>
        <label>Title: </label>
        <TextInput
          name="title"
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
        <br />
        <label>Size: </label>
        <TextInput
          name="size"
          type="text"
          value={size}
          onChange={(event) => setSize(event.target.value)}
        />
        <br />
        <label>Cost Per Month: </label>
        <TextInput
          name="cost_per_month"
          type="text"
          value={costPerMonth}
          onChange={(event) => setCostPerMonth(event.target.value)}
        />
        <br />
        <label>Is it irrigated: </label>
        <Checkbox
          name="is_irrigated"
          type="checkbox"
          checked={isIrrigated}
          onChange={(e) => setIsIrrigated(e.target.checked)}
        />
        <br />
        <label>Term in Months: </label>
        <TextInput
          name="term"
          type="text"
          value={term}
          onChange={(event) => setTerm(event.target.value)}
        />
        <br />
        <label>Rating: </label>
        <TextInput
          name="term"
          type="text"
          value={rating}
          onChange={(event) => setRating(event.target.value)}
        />
        <br />
        <label>Lot Type: </label>
        <Select
          name="lot_type"
          value={type}
          onChange={(event) => setType(event.target.value)}
        >
          <option value="Select an option">Select an option</option>
          <option value="Commercial">Commercial</option>
          <option value="Residential">Residential</option>
        </Select>
        <br />
        <label>Lot Description: </label>
        <Textarea
          name="description"
          placeholder="Write a description for your lot..."
          width={750}
          value={lotDescription}
          onChange={(event) => setLotDescription(event.target.value)}
        />
        <br />
        <label>Street: </label>
        <TextInput
          name="street"
          type="text"
          value={street}
          onChange={(event) => setStreet(event.target.value)}
        />
        <br />
        <label>City: </label>
        <TextInput
          name="city"
          type="text"
          value={city}
          onChange={(event) => setCity(event.target.value)}
        />
        <br />
        <label>country: </label>
        <TextInput
          name="country"
          type="text"
          value={country}
          onChange={(event) => setCountry(event.target.value)}
        />
        <br />
        <label>Post Code: </label>
        <TextInput
          name="post_code"
          type="text"
          value={postCode}
          onChange={(event) => setPostCode(event.target.value)}
        />

        <br />
        <label>Available Date: </label>
        <TextInput
          name="available_date"
          type="date"
          value={availableDate}
          onChange={(event) => setAvailableDate(event.target.value)}
        />
        <br />
        <div className="lot-form--add-img">
          <label>Add an image url: </label>
          <TextInput
            name="image_url"
            type="text"
            value={image}
            onChange={(event) => setImage(event.target.value)}
          />
          <Button margin={5} onClick={handleImages}>
            add image
          </Button>
        </div>
        <div>
          <Button type="submit" onClick={handleSubmit}>
            Submit
          </Button>
        </div>
      </form>
    </section>
  );
};

export default LotFormEdit;
