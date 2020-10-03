import React from "react";
import { Pane} from "evergreen-ui";
import ImageItem from "./Image/ImageItem";
import "./LotTile.css";

const LotTile = (props) => {

  return (
    <div className="lot-tile">
      <Pane
        display="flex"
        flexDirection="column"
        alignItems="center"
      >
        <ImageItem url={props.imageUrls[0]} />
        <div className="lot-tile--text">
          <Pane>{props.name}</Pane>
          {/* <Pane>{props.title}</Pane> */}
          <Pane>Location: {props.city}</Pane>
          <Pane>Cost per Month: ${props.costPerMonth}</Pane>
        </div>
      </Pane>
    </div>
  );
};

export default LotTile;
