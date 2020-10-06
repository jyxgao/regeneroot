import React from "react";
import { Pane, Button } from "evergreen-ui";
import { Link } from "react-router-dom";
import "./SmallLotItem.css";
import classnames from "classnames";
import Slider from "./Image/Slider";

const SmallLotItem = (props) => {
  const smallLotClass = classnames("smallLot", {
    "smallLot--owned": props.lotOwnerStatus === "owned",
    "smallLot--leased": props.lotOwnerStatus === "leased",
  });
  return (
    <div className={smallLotClass}>
      <Pane
        display="flex"
        flexDirection="column"
        alignItems="center"
        width={500}
      >
        {/* <ImageItem url={props.imageUrls[0]} /> */}
        {props.imageUrls && <Slider urls={props.imageUrls} />}
        <Pane className="small-lot--text" display="flex" flexDirection="row">
          <Pane paddingRight={20} paddingBottom={20}>
            <Pane>Title: {props.title}</Pane>
            <Pane>Location: {props.city}</Pane>
            <Pane>Cost per Month: ${props.costPerMonth}</Pane>
            <Pane>{props.description.substring(0, 30)}...</Pane>
          </Pane>
          <Link to={`/lot/${props.id}`}>
            <Button
              display="flex"
              fontFamily="Poppins"
              size={400}
              className="button--details"
              margin={10}
              textDecoration="none"
            >
              Details
            </Button>
          </Link>
          {props.lotOwnerStatus === "owned" && (
            <div className="smallLot--top-right-owned">MY LOT</div>
          )}
          {props.lotOwnerStatus === "leased" && (
            <div className="smallLot--top-right-leased">RENTING</div>
          )}
        </Pane>
      </Pane>
    </div>
  );
};

export default SmallLotItem;
