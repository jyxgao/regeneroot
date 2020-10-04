import React, { useEffect } from "react";
import "./LotDetail.css";
import { Pane, Button, Popover, Position } from "evergreen-ui";
import LotFormEdit from "components/Lot/LotFormEdit";
import { useParams, useHistory } from "react-router-dom";
import Chat from "../components/Messages/Chat";
import axios from "axios";

const LotDetail = (props) => {
  const { state, setState } = props;
  const [isEditing, setIsEditing] = React.useState(false);
  const [isDeleting, setIsDeleting] = React.useState(false);
  const [isMessaging, setIsMessaging] = React.useState(false);
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

  // console.log("user obj", state.user)
  // console.log("user login", isLoggedIn(state.user))
  const currentLot = findLot(currentLotId);
  const findLotOwner = (lotId) => {
    const lots = state.lots;
    let lot = lots.filter((lot) => lot.id === lotId);
    return lot;
  };
  // const isOwned = state.lotsOwnerStatus[currentLotId];

  const isOwned = (lotId) => {
    if (state.lotsOwnerStatus[lotId] === "owned") {
      return true;
    }
    return false;
  };
  // console.log(isOwned(currentLotId))
  const handleMessage = () => {
    if (isLoggedIn(state.user)) {
      console.log("current lot", currentLot);
      console.log("owner id", currentLot.owner_id);
      setIsMessaging(true);
      return axios
        .get(`/lots/${currentLotId}/messages/${currentLot.owner_id}`)
        .then((response) => {
          console.log("response", response.data);
          setState((prev) => ({
            ...prev,
            messages: response.data,
          }));
        });
    } else {

    }


  };

  useEffect(() => {

    handleMessage();
    // const lot = state.lots.filter(item => item.id === 5);
  }, [state.user]);

  const history = useHistory();

  function onDelete(id) {
    return axios.post(`/api/lots/${id}/delete`).then((res) => {
      const lots = state.lots.filter((item) => item.id !== id);
      setState((prev) => ({
        ...prev,
        lots,
      }));
      let path = `/`;
      history.push(path);
    });
  }

  if (!currentLot) {
    //can return loading icon istead
    return null;
  }

  return (
    <Pane paddingTop={120} className="home--layout">
      {isMessaging && <Chat messages={state.messages} user={state.user} />}
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
              {isOwned(currentLotId) && (
                <Button onClick={(event) => setIsEditing(!isEditing)}>
                  Edit
                </Button>
              )}
              {/* {
            isOwned && (
            <Button onClick={(event) => setIsDeleting(!isDeleting)}>Delete</Button>
             )} */}
              {!isOwned(currentLotId) && isLoggedIn(state.user) && (
                <Button onClick={handleMessage}>Message Owner</Button>
              )}
              {isOwned(currentLotId) && (
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
    </Pane>
  );
};

export default LotDetail;
