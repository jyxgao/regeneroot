import React from "react";
import { Pane, Text, Button } from "evergreen-ui";

//Component to confirm move ahead with delete or cancel deletion of appointment
export default function ConfirmDelete(props) {

  return (
    <main className="LotDetail--confirm_delete" data-testid="delete-confirm-module">
      <h1 className="text--semi-bold">Are you sure you want to delete this lot?</h1>
      <section className="appointment__actions">
        <Button onClick={props.onCancel} danger>Cancel</Button>
        <Button data-testid="delete-confirm" onClick={() =>props.onDestroy(props.id)} danger>Delete</Button>
      </section>
    </main>
  );
};