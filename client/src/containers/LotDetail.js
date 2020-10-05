import React, { useEffect } from "react";
import "./LotDetail.css";
import { Pane, Button, Popover, Position } from "evergreen-ui";
import LotFormEdit from "components/Lot/LotFormEdit";
import { useParams, useHistory, Link } from "react-router-dom";
import ChatBoard from "../components/Messages/ChatBoard";
import Chat from "../components/Messages/Chat";
import axios from "axios";

const LotDetail = (props) => {
  const { state, setState } = props;
  const [isEditing, setIsEditing] = React.useState(false);
  const [isDeleting, setIsDeleting] = React.useState(false);
  const [isMessaging, setIsMessaging] = React.useState(false);
  // for owner:
  const [isCheckingMsgs, setIsCheckingMsgs] = React.useState(false);
  const params = useParams();
  const currentLotId = Number(params.id);

  const findLot = function (lotId) {
    let lots = state.lots;
    for (let lot of lots) {
      if (lot.id === lotId) {
        return lot;
      }
    }
  };

  // check if user logged in with email key
  const isLoggedIn = (obj) => {
    if (obj.email) {
      return true;
    }
    return false;
  };

  const currentLot = findLot(currentLotId);

  const isOwner = (lotId) => {
    if (state.lotsOwnerStatus[lotId] === "owned") {
      return true;
    }
    return false;
  };

  const getMessages = () => {
    if (isLoggedIn(state.user) && !isOwner(currentLotId)) {
      return axios
        .get(`/lots/${currentLotId}/messages/${currentLot.owner_id}`)
        .then((response) => {
          setState((prev) => ({
            ...prev,
            messages: response.data,
          }));
        });
    } else if (isLoggedIn(state.user) && isOwner(currentLotId)) {
      return axios.get(`/lots/${currentLotId}/messages`).then((response) => {
        // console.log(response.data);
        setState((prev) => ({
          ...prev,
          ownerMessages: response.data,
        }));
      });
    } else {
      return null;
    }
  };

  useEffect(() => {
    getMessages();
  }, [state.user]);

  const sendMessage = (text) => {
    return axios
      .post(`/lots/${currentLotId}/messages`, {
        text_body: text,
        other_id: currentLot.owner_id,
      })
      .then((data) => {
        const newMessage = {
          avatar: state.user.avatar,
          lot_id: currentLotId,
          owner_id: currentLot.owner_id,
          renter_id: state.user.id,
          username: state.user.username,
          text_body: data.data[0].text_body,
          written_by: state.user.id,
          created_at: Date.now(),
        };
        const updatedMessages = [...state.messages, newMessage];
        setState((prev) => ({
          ...prev,
          messages: updatedMessages,
        }));
      });
  };

  const history = useHistory();

  function onDelete(id) {
    return axios
      .post(`/api/lots/${id}/delete`)
      .then((res) => {
        const lots = state.lots.filter((item) => item.id !== id);
        setState((prev) => ({
          ...prev,
          lots,
        }));
        let path = `/`;
        history.push(path);
      })
      .catch((err) => console.log(err));
  }

  if (!currentLot) {
    //can return loading icon istead
    return null;
  }

  return (
    <Pane
      paddingTop={120}
      className="home--layout"
      display="flex"
      flexDirection="column"
    >
      <Link to="/mapview">
        <Button onClick={(event) => setIsMessaging(false)}>Back to List</Button>
      </Link>
      {isEditing && (
        <LotFormEdit
          lot={currentLot}
          setIsEditing={setIsEditing}
          isEditing={isEditing}
          state={state}
          setState={setState}
          id={currentLotId}
        />
      )}
      {!isEditing && (
        <section className="LotDetail_layout">
          <div className="LotDetail--detail_group">
            <div>
              <div className="LotDetail--confirm_delete">
                {isDeleting && (
                  <Popover
                    content={({ close, destroy }) => (
                      <Pane
                        width={320}
                        height={320}
                        paddingX={40}
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        flexDirection="column"
                      >
                        <Button onClick={close}>Cancel</Button>
                        <Button
                          onClick={() => {
                            onDelete(currentLotId);
                          }}
                        >
                          Confirm
                        </Button>
                      </Pane>
                    )}
                  >
                    <Button>Trigger Popover</Button>
                  </Popover>
                )}
              </div>
              <img
                className="LotDetail--main_image"
                src={currentLot.images[0]}
                alt="lot-img"
              ></img>
            </div>
            <div className="LotDetail--title_block">
              <div>
                <div className="LotDetail--title">{currentLot.title}</div>
                <div className="LotDetail--subtitle">{currentLot.size}</div>
              </div>
              <div className="LotDetail--title">
                {currentLot.cost_per_month}
              </div>
            </div>
            <div>
              {isOwner(currentLotId) && (
                <Button onClick={(event) => setIsEditing(!isEditing)}>
                  Edit
                </Button>
              )}
              {/* {
            isOwner && (
            <Button onClick={(event) => setIsDeleting(!isDeleting)}>Delete</Button>
             )} */}
              {!isOwner(currentLotId) &&
                isLoggedIn(state.user) &&
                !isMessaging && (
                  <Button onClick={() => setIsMessaging(true)}>
                    Message Owner
                  </Button>
                )}
              {isOwner(currentLotId) && (
                <Popover
                  content={({ close }) => (
                    <Pane
                      width={320}
                      height={320}
                      paddingX={40}
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      flexDirection="column"
                    >
                      <Button onClick={close}>Cancel</Button>
                      <Button
                        onClick={() => {
                          onDelete(currentLotId);
                        }}
                      >
                        Confirm
                      </Button>
                    </Pane>
                  )}
                  shouldCloseOnExternalClick={false}
                  position={Position.TOP_LEFT}
                >
                  <Button>Delete</Button>
                </Popover>
              )}
              {isOwner(currentLotId) && isLoggedIn(state.user) && (
                <Button onClick={(event) => setIsCheckingMsgs(!isCheckingMsgs)}>
                  View my Inbox
                </Button>
              )}
              {/* {currentLot.logedin && <Button>Delete</Button>} */}
            </div>
            <div className="LotDetail--description">
              {currentLot.lot_description}
            </div>
            <ul className="LotDetail--list">
              <li>{currentLot.lot_type}</li>
              <li>{currentLot.condition_rating}</li>
              <li>{currentLot.is_irrigated}</li>
              <li>{currentLot.suggested_term}</li>
              <li>{currentLot.available_date}</li>
            </ul>
          </div>
          <div className="LotDetail--image_list">
            {currentLot.images.map((image) => {
              return (
                <img
                  key={image}
                  className="LotDetail--image_list_item"
                  src={image}
                  alt="lot-img"
                />
              );
            })}
          </div>
        </section>
      )}
            {isCheckingMsgs && (
              <ChatBoard
                ownerMessages={state.ownerMessages}
                user={state.user}
                lotId={currentLotId}
                userId={state.user.id}
                ownerId={currentLot.owner_id}
                sendMessage={sendMessage}
                isMessaging={isMessaging}
                setIsMessaging={setIsMessaging}
              />
            )}
            {isMessaging && !isOwner(currentLotId) && (
              <Chat
                messages={state.messages}
                user={state.user}
                lotId={currentLotId}
                userId={state.user.id}
                ownerId={currentLot.owner_id}
                sendMessage={sendMessage}
                isMessaging={isMessaging}
                setIsMessaging={setIsMessaging}
              />
            )}
    </Pane>
  );
};
export default LotDetail;
