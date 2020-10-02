import React from 'react';
import './LotDetail.css';
import { Pane, Text, Button } from "evergreen-ui";
import LotFormEdit from "components/Lot/LotFormEdit";
import ConfirmDelete from "components/Lot/ConfirmDelete";
 import { useParams } from 'react-router-dom';

const LotDetail = (props) => {

// const [ selectedImage, setSelectedImage ] = React.useState(state.lot.images[0]);

// const onSelect = lotImage => { setSelectedImage(lotImage) }

// const [ isOwner, setIsOwner ] = React.useState(false);

const [ isEditing, setIsEditing ] = React.useState(false);

const [ isDeleting, setIsDeleting ] = React.useState(false);

const {state, setState} = props;

const params = useParams();

const currentLotId = Number(params.id);

const findLot = function(lotId) {
  let lots = state.lots
  for(let lot of lots) {
    if(lot.id === lotId) {
      return lot
    }
  }
}

const currentLot = findLot(currentLotId);

console.log(currentLot);



// const state= {
//     lot: {"id": 5,
//     "owner_id": 4,
//     "title": "Northland",
//     "size": 458,
//     "cost_per_month": "33.00",
//     "is_irrigated": false,
//     "suggested_term": 18,
//     "condition_rating": 4,
//     "available_date": "2020-08-10T00:00:00.000Z",
//     "lot_type": "commercial",
//     "lot_description": "In hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.",
//     "is_leased": true,
//     "street_address": "1903 Parsons Rd NW",
//     "city": "Edmonton",
//     "country": "Canada",
//     "post_code": "T6N1H5",
//     "lat": null,
//     "long": null,
//     "created_at": "2020-07-10T00:00:00.000Z",
//     "is_active": false,
//     "lot_id": 5,
//     "images": [
//       "https://consumerist.com/consumermediallc.files.wordpress.com/2014/08/2047.png",
//       "http://seanparnell.com/CALP/VacantLotEGP.jpg",
//       "https://savetherain.us/wp-content/uploads/2012/10/Vacant-Lot-Putnam.jpg",
//       "http://www.waterwinterwonderland.com/images/drivein/10/B%5EThe_empty_lot_next_to_store_photo_from_Water_Winter_Wonderland.jpg",
//       "http://smartgrowth.org/wp-content/uploads/2015/08/lot.jpg"
//       ],
//       "location": {
//       "lat": 49.13389,
//       "lng": -122.62733
//       },
//       "logedin" : true
//     }
//   }


if (!currentLot) {
  //can return loading icon istead
  return null;
}

  return (
    <main className="home--layout">
      <Pane>
        <nav className="navbar"></nav>
      </Pane>
      <div>
            {isEditing &&
              <LotFormEdit 
              lot={currentLot}
              />
            }
      </div>
      {!isEditing &&
      <section className="LotDetail_layout">
        <div className="LotDetail--detail_group">
          <div>
          <div className="LotDetail--confirm_delete">
            {isDeleting &&
              <ConfirmDelete
              lot={currentLot}
              />
            }
          </div>
            <img className="LotDetail--main_image" src={currentLot.images[0]}></img>
          </div>
          <div className="LotDetail--title_block">
            <div >
              <div className="LotDetail--title">{currentLot.title}</div>
              <div className="LotDetail--subtitle">{currentLot.size}</div>
            </div>
            <div className="LotDetail--title">{currentLot.cost_per_month}</div>
          </div>
          <div>
            {
            currentLot.logedin && (
            <Button onClick={(event) => setIsEditing(!isEditing)}>Edit</Button>
             )}
            {
            currentLot.logedin && (
            <Button onClick={(event) => setIsDeleting(!isDeleting)}>Delete</Button>
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
                {currentLot.images.map(image =>{
                  return (
                  <img className="LotDetail--image_list_item" src={image} />
                  )
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
      }
  </main>
);
}

export default LotDetail;