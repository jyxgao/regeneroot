import React from "react";
import "./Footer.css";
import { Pane } from "evergreen-ui";

const Footer = () => {
  return (
    <Pane padding={100} display="flex" className="footer" width="100%" borderTop="default" background="tint1">
      <p>This is some content</p>
    </Pane>
  );
};

export default Footer;
