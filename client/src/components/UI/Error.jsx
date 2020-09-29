import React from "react";
import classnames from "classnames";

const Error = (props) => {
  return (
    <main>
      <section>
        <h1>Error</h1>
        <h3>{props.message}</h3>
      </section>
      <img src="" alt="Close" onClick={props.onClose} />
    </main>
  );
};

export default Error;
