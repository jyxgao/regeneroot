import React from "react";
import { Pane, Textarea } from "evergreen-ui";

const Chat = (props) => {
  return (
    <Pane>
      <Textarea placeholder="Send a message..."></Textarea>
      {props.messages.map((message) => {
        return <Pane key={message.message_id}>{message.text_body}</Pane>;
      })}
      {console.log(props.messages)}
    </Pane>
  );
};

export default Chat;
