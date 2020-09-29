import React from "react";
import classnames from "classnames";

const Button = (props) => {
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

export default Button;