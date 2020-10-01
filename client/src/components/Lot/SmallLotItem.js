import React from "react";
import { Pane, Text, Button } from "evergreen-ui";
import ImageItem from "./Image/ImageItem";
import "./SmallLotItem.css";
// import { Redirect, Link } from "react-router-dom";

const LotListItem = (props) => {
  // const lots = {
  //   image_url: ["https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pinterest.com%2Fspeterson1024%2Ftiny-hearts%2F&psig=AOvVaw1h36nTO0LIC7Vxr-OZWC5P&ust=1601337566857000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCMjdqLnFiuwCFQAAAAAdAAAAABAD", "https://www.google.com/imgres?imgurl=https%3A%2F%2Fwww.inktion.com%2Fwp-content%2Fuploads%2F2017%2F09%2Ftemporary-tattoo-small-hearts-4.jpg&imgrefurl=https%3A%2F%2Fwww.inktion.com%2Fproduct%2Fsmall-heart-tattoo%2F&tbnid=CxPMSLJ_kTrlHM&vet=12ahUKEwiD2_y3xYrsAhUIhp4KHa56CxMQMygFegUIARDEAQ..i&docid=lBBpjecXeJJjGM&w=600&h=550&q=small%20photo&hl=en&ved=2ahUKEwiD2_y3xYrsAhUIhp4KHa56CxMQMygFegUIARDEAQ"],
  //   name: "SeaIsland",
  //   lotDescription: "Beatiful land",
  //   id: 1
  // }
  return (
    <div className="small-lot-item">
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
        </div>
        {props.logedin && (
          <Button onClick={(event) => (window.location.href = "/new")}>
            Edit
          </Button>
        )}
        {props.logedin && <Button>Delete</Button>}
      </Pane>
    </div>
  );
};

export default LotListItem;
