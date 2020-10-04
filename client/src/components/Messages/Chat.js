import React from "react";
import { Pane, Textarea, IconButton, CrossIcon } from "evergreen-ui";

const Chat = (props) => {
  const onClose = () => {
    props.setIsMessaging(false);
  }

  return (
    <Pane>
      <IconButton display="flex" icon={CrossIcon} onClick={onClose}/>
      <Textarea placeholder="Send a message..."></Textarea>
      {props.messages &&
        props.messages.map((message) => {
          return (
            <Pane key={message.message_id}>
              <Pane display="flex" flexDirection="row" padding={10}>
                <Pane>{message.username}: </Pane>
                <Pane display="flex" paddingLeft={10} paddingRight={10} justifyContent="flex-wrap">{message.text_body}</Pane>
              </Pane>
            </Pane>
          );
        })}
      {console.log(props.messages)}
    </Pane>
  );
};

export default Chat;
