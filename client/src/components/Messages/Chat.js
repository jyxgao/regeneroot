import React from "react";
import { Pane, Textarea } from "evergreen-ui";

const Chat = (props) => {
  return (
    <Pane>
      <Textarea placeholder="Send a message..."></Textarea>
    </Pane>
  );
};

export default Chat;