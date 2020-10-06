import React, { useEffect } from "react";
import "./LotDetail.css";
import {
  Pane,
  Button,
  Popover,
  Position,
  UnorderedList,
  ConfirmIcon,
  ListItem,
  Text,
} from "evergreen-ui";
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
      paddingTop={80}
      className="home--layout"
      display="flex"
      flexDirection="column"
    >
      <div className="LotDetail--backButton">
        <Link to="/mapview">
          <Button
            className="button--back"
            fontFamily="Poppins"
            onClick={(event) => setIsMessaging(false)}
          >
            Back to List
          </Button>
        </Link>
      </div>
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
                        intent="danger"
                        appearance="primary"
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

            <div className="LotDetail--pic_with_titles">
              <div className="LotDetail--title_block">
                <div>
                  <div className="LotDetail--title">{currentLot.title}</div>
                </div>
                <div className="LotDetail--price">
                  {`$${currentLot.cost_per_month}/mo`}
                </div>
              </div>
              <div>
                <img
                  className="LotDetail--main_image"
                  src={currentLot.images && currentLot.images[0]}
                  alt="lot-img"
                ></img>
              </div>
            </div>

            <div className="LotDetail--subtitle_group">
              <div className="LotDetail--subtitle">{`${currentLot.size} sf ${currentLot.lot_type} lot`}</div>
              <div className="LotDetail--edit_buttons">
                {isOwner(currentLotId) && (
                  <Button
                    margin={5}
                    fontFamily="Poppins"
                    className="button--edit"
                    onClick={(event) => setIsEditing(!isEditing)}
                  >
                    Edit
                  </Button>
                )}
                {!isOwner(currentLotId) &&
                  isLoggedIn(state.user) &&
                  !isMessaging && (
                    <Button
                      margin={5}
                      className="button--message-owner"
                      fontFamily="Poppins"
                      onClick={() => setIsMessaging(true)}
                    >
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
                        flexDirection="column"
                        justifyContent="space-evenly"
                        alignItems="center"
                      >
                        <Text>Are you sure you want to delete?</Text>
                        <Button
                          intent="danger"
                          appearance="primary"
                          onClick={() => {
                            onDelete(currentLotId);
                          }}
                        >
                          Confirm
                        </Button>
                        <Button onClick={close}>Cancel</Button>
                      </Pane>
                    )}
                    shouldCloseOnExternalClick={false}
                    position={Position.TOP_LEFT}
                  >
                    <Button
                      margin={5}
                      className="button--delete"
                      fontFamily="Poppins"
                      intent="danger"
                    >
                      Delete
                    </Button>
                  </Popover>
                )}
                {isOwner(currentLotId) && isLoggedIn(state.user) && (
                  <Button
                    fontFamily="Poppins"
                    className="button--owner-inbox"
                    margin={5}
                    onClick={(event) => setIsCheckingMsgs(!isCheckingMsgs)}
                  >
                    Inbox
                  </Button>
                )}
              </div>
            </div>
            <div className="LotDetail--description">
              {currentLot.lot_description}
            </div>
            <UnorderedList size={300} icon={ConfirmIcon} iconColor="success">
              <ListItem
                size={300}
              >{`condition rating: ${currentLot.condition_rating}`}</ListItem>
              <ListItem size={300}>
                {currentLot.is_irrigated
                  ? `Has Access to Irrigation`
                  : `Does not have Access to Irrigation`}
              </ListItem>
              <ListItem
                size={300}
              >{`Suggested term: ${currentLot.suggested_term} months`}</ListItem>
              <ListItem
                size={300}
              >{`Available date: ${currentLot.available_date}`}</ListItem>
            </UnorderedList>
          </div>
          <div className="LotDetail--image_list">
            {currentLot.images && currentLot.images.map((image) => {
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
