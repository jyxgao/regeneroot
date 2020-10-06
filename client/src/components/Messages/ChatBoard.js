import React, { useState } from "react";
import { Pane, Table, Avatar } from "evergreen-ui";
import Chat from "./Chat";

const ChatBoard = (props) => {
  const [selectedContact, setSelectedContact] = useState(null);
  const isObjEmpty = (obj) => {
    for (let ele in obj) {
      if (obj.hasOwnProperty(ele)) {
        return false;
      }
    }
    return true;
  };

  // console.log(selectedContact)
  const onSelect = (renterId) => {
    setSelectedContact(renterId);
    props.setIsMessaging(true)
  };

  return (
    <Pane>
      Inbox
      {/* {selectedContact && (
        <Chat
          messages={props.messages[selectedContact]}
          user={props.user}
          lotId={props.lotId}
          userId={props.userId}
          ownerId={props.ownerId}
          sendMessage={props.sendMessage}
          isMessaging={props.isMessaging}
          setIsMessaging={props.setIsMessaging}
        />
      )} */}
      {!selectedContact && (
        <Table>
          <Table.Body height={240}>
            {!isObjEmpty(props.ownerMessages) && Object.keys(props.ownerMessages).map((key, index) => {
              return (
                <Table.Row
                  key={index}
                  isSelectable
                  onSelect={(event) => setSelectedContact(key)}
                >
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
                    {props.ownerMessages[key][0].username}
                  </Table.TextCell>
                  <Table.TextCell>
                    {props.ownerMessages[key].length} messages
                  </Table.TextCell>
                  <Table.TextCell>
                    <Avatar src={props.ownerMessages[key][0].avatar} />
                  </Table.TextCell>
                  {console.log(props.ownerMessages["2"])}
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table>
      )}
    </Pane>
  );
};

export default ChatBoard;
