import React from "react";
import { Pane, Text, Button } from "evergreen-ui";
import ImageItem from "./Image/ImageItem";
import "./SmallLotItem.css";
import classnames from "classnames";

// import { Redirect, Link } from "react-router-dom";

const SmallLotItem = (props) => {
  const smallLotClass = classnames("smallLot", {
    "smallLot--owned": props.lotOwnerStatus === "owned",
    "smallLot--leased": props.lotOwnerStatus === "leased",
  })

  return (
    <div className={smallLotClass}>
      <Pane
        display="flex"
        flexDirection="column"
        alignItems="center"
        width={500}
      >
        <ImageItem url={props.imageUrls[0]} />
        <div className="small-lot--text">
          <Pane>{props.name}</Pane>
          <Pane>{props.title}</Pane>
          <Pane>{props.city}</Pane>
          {props.lotOwnerStatus ==="owned" && 
          <div className="smallLot--top-right-owned">MY LOT</div>
          }
          {props.lotOwnerStatus ==="leased" && 
          <div className="smallLot--top-right-leased">RENTING</div>
          }
        </div>
        {/* {props.logedin && (
          <Button onClick={(event) => (window.location.href = "/new")}>
            Edit
          </Button>
        )}
        {props.logedin && <Button>Delete</Button>} */}
      </Pane>
    </div>
  );
};

export default SmallLotItem;
