import React, { useState } from "react";
import { Pane, Textarea, IconButton, CrossIcon, Button } from "evergreen-ui";

const Chat = (props) => {
  const [textbody, setTextbody] = useState("");
  const handleMessageSubmit = (e) => {
    e.preventDefault();
    props.sendMessage(textbody);
  };

  const onClose = () => {
    props.setIsMessaging(false);
  };

  return (
    <Pane padding={10}>
      <IconButton display="flex" icon={CrossIcon} onClick={onClose} />
      {props.messages &&
        props.messages.map((message, index) => {
          return (
            <Pane key={index}>
              <Pane display="flex" flexDirection="row" padding={10}>
                <Pane>{message.username}: </Pane>
                <Pane
                  display="flex"
                  paddingLeft={10}
                  paddingRight={10}
                  justifyContent="flex-wrap"
                >
                  {message.text_body}
                </Pane>
              </Pane>
            </Pane>
          );
        })}
        <Textarea
          placeholder="Send a message..."
          onChange={(e) => {
            setTextbody(e.target.value);
          }}
        ></Textarea>
        <Button onClick={handleMessageSubmit}>Send</Button>
      {/* {console.log(props.messages)} */}
    </Pane>
  );
};

export default Chat;
