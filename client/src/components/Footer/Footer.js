import React from "react";
import "./Footer.css";
import { Pane } from "evergreen-ui";
import {Link} from 'react-router-dom';
import github from '../../assets/github.png'

const Footer = () => {
  return (
    <Pane padding={100} display="flex" flexDirection="row" justifyContent="center" className="footer" width="100%" borderTop="default" background="tint1">
      <Pane padding={30}><img height={18} src={github} alt="github"></img><a href="https://github.com/jyxgao"> Jenny Gao</a></Pane>
      <Pane padding={30}><img height={18} src={github} alt="github"></img><a href="https://github.com/derekb123"> Derek Butvin</a></Pane>
      <Pane padding={30}><img height={18} src={github} alt="github"></img><a href="https://github.com/potatolight"> Grace Bai</a></Pane>
    </Pane>
  );
};

export default Footer;
