import React from "react";
import { Pane } from "evergreen-ui";
import ImageItem from "./Image/ImageItem";
import "./LotTile.css";
import { Link } from "react-router-dom";

const LotTile = (props) => {
  return (
    <div className="lot-tile">
      <Pane display="flex" flexDirection="column" alignItems="center">
        <ImageItem url={props.imageUrls[0]} />
        <div className="lot-tile--text">
          <Link to={`/lot/${props.id}`}>
            <Pane>Location: {props.city}</Pane>
          </Link>
          <Pane>Cost per Month: ${props.costPerMonth}</Pane>
        </div>
      </Pane>
    </div>
  );
};

export default LotTile;
