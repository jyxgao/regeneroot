import React, { useState, setState } from "react";
import axios from "axios";
import "./LotForm.css";
import { Button, TextInput, Textarea, Checkbox, Select, Pane, Table } from "evergreen-ui";
// import { useParams, useHistory, Link } from "react-router-dom";

const LotCheckout = (props) => {

  const suggestedTerm = props.lot.suggested_term;
  const costPerMonth = props.lot.cost_per_month;
  const subtotalCost = suggestedTerm * costPerMonth;
  const taxRate = .08;
  const taxCost = subtotalCost * taxRate;
  const totalCost = subtotalCost + taxCost;

  const currentLotId = props.currentLotId

  const [name, setName] = useState("");
  const [cardNum, setCardNum] = useState("");
  const [expirDate, setExpirDate] = useState("");
  const [cvcCode, setCvcCode] = useState("");
  const [billingStreet, setBillingStreet] = useState("");
  const [billingCity, setBillingCity] = useState("");
  const [billingProvince, setBillingProvince] = useState("");
  const [billingZip, setBillingZip] = useState("");
  const [isAgreeing, setIsAgreeing] = useState("");

  const handleSubmit = (event) => {
    axios
      .post(`/api/leases`, {
        lot_id: props.currentLotId,
        owner_id: props.lot.owner_id,
        term_length: props.lot.suggested_term,
        total_cost: totalCost
      })
      .then(()=> {
        const currentLotsOwnerStatus = {...props.state.lotsOwnerStatus, [currentLotId]: "leased"};
        props.setState((prev) => ({
          ...prev,
          lotsOwnerStatus: currentLotsOwnerStatus,
        }));
        
        props.setIsLeasing(!props.isLeasing);
      }
    )
  .catch((error) => console.log(error));
  };

  return (
    <Pane className="lot-form--new" paddingTop={100} display="flex">
       <Pane display="flex" flexDirection="column" justifyContent="center">
      {/* <form autoComplete="off"> */}
        <h1>Checkout</h1>
        <h3>{`${props.lot.title} lot: ${props.lot.size} square feet`}</h3>
        <Table>
          {/* <Table.Head>
            <Table.TextHeaderCell>
              Last Activity
            </Table.TextHeaderCell>
            <Table.TextHeaderCell>
              ltv
            </Table.TextHeaderCell>
          </Table.Head> */}
          <Table.Body height={240}>
              <Table.Row key={props.lot.id}>
                <Table.TextCell>Cost Per Month</Table.TextCell>
                <Table.TextCell isNumber>{`$${costPerMonth}`}</Table.TextCell>
              </Table.Row>
              <Table.Row>
                <Table.TextCell>Term Length</Table.TextCell>
                <Table.TextCell isNumber>{`${suggestedTerm} months`}</Table.TextCell>
              </Table.Row>
              <Table.Row>
                <Table.TextCell>Subtotal</Table.TextCell>
                <Table.TextCell isNumber>{`$${subtotalCost}`}</Table.TextCell>
              </Table.Row>
              <Table.Row>
                <Table.TextCell>Tax</Table.TextCell>
                <Table.TextCell isNumber>{`$${taxCost}`}</Table.TextCell>
              </Table.Row>
              <Table.Row>
                <Table.TextCell>Total</Table.TextCell>
                <Table.TextCell isNumber>{`$${totalCost}`}</Table.TextCell>
              </Table.Row>
          </Table.Body>
        </Table>
        <label>Name: </label>
        <TextInput
          name="name"
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        <br />
        <label>Credit Card Number: </label>
        <TextInput
          name="credit_card_number"
          type="text"
          value={cardNum}
          onChange={(event) => setCardNum(event.target.value)}
        />
        <br />
        <label>Expiration Date: </label>
        <TextInput
          name="expiration_date"
          type="text"
          value={expirDate}
          onChange={(event) => setExpirDate(event.target.value)}
        />
        <Checkbox
          label="I have read and agree to the Terms of Agreement"
          name="Terms_of_agreement"
          type="checkbox"
          checked={isAgreeing}
          onChange={(e) => setIsAgreeing(e.target.checked)}
        />
        <div>
          <Button type="submit" onClick={handleSubmit}>
            Submit
          </Button>
        </div>
      {/* </form> */}
      </Pane>
    </Pane>
  );
};

export default LotCheckout;
