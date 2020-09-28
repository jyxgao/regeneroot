import React from "react";
var classnames = require('classnames');

export default function Button(props) {
  return (
    <button
      // className={buttonClass}
      type={props.type}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
}