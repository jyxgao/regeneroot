import React, { useState } from "react";
import { Pane, Table, Avatar } from "evergreen-ui";
import Chat from "./Chat";

const ChatBoard = (props) => {
  const isObjEmpty = (obj) => {
    for (let ele in obj) {
      if (obj.hasOwnProperty(ele)) {
        return false;
      }
    }
    return true;
  };

  return (
    <Pane>
      this is a chatboard
      <Table>
        <Table.Body height={240}>
          {Object.keys(props.messages).map((key, index) => {
            return (
              <Table.Row key={index} isSelectable onSelect={}>
                {/* {props.messages[key].map((messages) => {
              // return;
              <Chat
                messages={messages}
                user={props.user}
                lotId={props.lotId}
                userId={props.userId}
                ownerId={props.ownerId}
                sendMessage={props.sendMessage}
                isMessaging={props.isMessaging}
                setIsMessaging={props.setIsMessaging}
              />;
            })} */}
                {/* <Pane>{props.messages[key].length} messages</Pane> */}

                <Table.TextCell>
                  {props.messages[key][0].username}
                </Table.TextCell>
                <Table.TextCell>
                  {props.messages[key].length} messages
                </Table.TextCell>
                <Table.TextCell>
                  <Avatar src={props.messages[key][0].avatar} />
                </Table.TextCell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    </Pane>
    // {console.log(props.messages["2"])}
  );
};

export default ChatBoard;
