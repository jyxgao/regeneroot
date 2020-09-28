import React from "react";

export default function Error(props) {
  return (
    <main>
      <section>
        <h1>Error</h1>
        <h3>{props.message}</h3>
      </section>
      <img
        src="images/close.png"
        alt="Close"
        onClick={props.onClose}
      />
    </main>
  )
}