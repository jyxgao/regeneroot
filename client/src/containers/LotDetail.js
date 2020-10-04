import React from "react";
import "./LotDetail.css";
import { Pane, Button, Popover, Position } from "evergreen-ui";
import LotFormEdit from "components/Lot/LotFormEdit";
import { useParams, useHistory } from "react-router-dom";
import Chat from "../components/Messages/Chat";
import axios from "axios";

const LotDetail = (props) => {
  const [isEditing, setIsEditing] = React.useState(false);

  const [isDeleting, setIsDeleting] = React.useState(false);

  const [isMessaging, setIsMessaging] = React.useState(false);

  const { state, setState } = props;

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
  const isEmpty = (obj) => {
    if (!props.user.email) {
      return true;
    }
    return false;
  };

  const currentLot = findLot(currentLotId);

  const isOwned = state.lotsOwnerStatus[currentLotId];

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
    <main className="home--layout">
      {!isEmpty(state.user) && !isOwned && (
        <Button onClick={(event) => setIsMessaging(true)}>Message Owner</Button>
      )}
      <div>
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
      </div>
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
              {isOwned && (
                <Button onClick={(event) => setIsEditing(!isEditing)}>
                  Edit
                </Button>
              )}
              {/* {
            isOwned && (
            <Button onClick={(event) => setIsDeleting(!isDeleting)}>Delete</Button>
             )} */}
              {isOwned && (
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
                  className="LotDetail--image_list_item"
                  src={image}
                  alt="lot-img"
                />
              );
            })}
          </div>
          {/* {currentLot.isOwned &&
          (
          <div className="App">
          <ImageList
            imageUrls={currentLot.images}
          />
        </div>
          )} */}
        </section>
      )}
    </main>
  );
};

export default LotDetail;
