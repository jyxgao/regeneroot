import React from "react";
import axios from "axios";
import Button from "../UI/Button";

const LotForm = (props) => {
  const [title, setTitle] = React.useState("");
  const [size, setSize] = React.useState("");
  const [costPerMonth, setCostPerMonth] = React.useState("");
  const [isIrrigated, setIsIrrigated] = React.useState(false);
  const [term, setTerm] = React.useState("");
  const [rating, setRating] = React.useState("");
  const [availableDate, setAvailableDate] = React.useState("");
  const [type, setType] = React.useState("");
  const [lotDescription, setLotDescription] = React.useState("");
  const [isLeased, setIsleased] = React.useState(false);
  const [street, setStreet] = React.useState("");
  const [city, setCity] = React.useState("");
  const [country, setCountry] = React.useState("");
  const [postCode, setPostCode] = React.useState("");
  const [created, setCreated] = React.useState(
    new Date().toLocaleString().slice(0, 9)
  );
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
      .post("/api/lots", {
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
        // created_at: created,
        is_active: true,
        images: [
          "https://www.google.com/url?sa=i&url=https%3A%2F%2Fcloudfour.com%2Fexamples%2Fimg-currentsrc%2F&psig=AOvVaw1mveMqKOFyRUQ6UYnN6T3W&ust=1601429150390000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCLDby8-ajewCFQAAAAAdAAAAABAD",
        ],
      })
      // .then((res) => console.log(res.data))
      // .catch((error) => console.log(error));

    event.preventDefault();
  }
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

export default LotForm;