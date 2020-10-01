import React from 'react';
import './LotDetail.css';
import { Pane, Text, Button } from "evergreen-ui";

const LotDetail = () => {

// const [ selectedImage, setSelectedImage ] = React.useState(props.images[0]);

// const onSelect = lotImage => { setSelectedImage(lotImage) }

// const [ isOwner, setIsOwner ] = React.useState(false);



const props = {
    "id": 5,
    "owner_id": 4,
    "title": "Northland",
    "size": 458,
    "rate": "33.00",
    "is_irrigated": false,
    "suggested_term": 18,
    "condition_rating": 4,
    "available_date": "2020-08-10T00:00:00.000Z",
    "lot_type": "commercial",
    "lot_description": "In hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.",
    "is_leased": true,
    "street_address": "1903 Parsons Rd NW",
    "city": "Edmonton",
    "country": "Canada",
    "post_code": "T6N1H5",
    "lat": null,
    "long": null,
    "created_at": "2020-07-10T00:00:00.000Z",
    "is_active": false,
    "lot_id": 5,
    "images": [
      "https://consumerist.com/consumermediallc.files.wordpress.com/2014/08/2047.png",
      "http://seanparnell.com/CALP/VacantLotEGP.jpg",
      "https://savetherain.us/wp-content/uploads/2012/10/Vacant-Lot-Putnam.jpg",
      "http://www.waterwinterwonderland.com/images/drivein/10/B%5EThe_empty_lot_next_to_store_photo_from_Water_Winter_Wonderland.jpg",
      "http://smartgrowth.org/wp-content/uploads/2015/08/lot.jpg"
      ],
      "location": {
      "lat": 49.13389,
      "lng": -122.62733
      },
      "logedin" : true
  }

//owner_id, title, size, cost_per_month, is_irrigated, suggested_term, condition_rating, available_date, lot_type, lot_description, is_leased, street_address, city, country, post_code, lat, long, created_at, is_active

  return (
    <main className="home--layout">
      <Pane>
        <nav className="navbar"></nav>
      </Pane>
      <section className="LotDetail_layout">
        <div className="LotDetail--detail_group">
          <div>
            <img className="LotDetail--main_image" src={props.images[0]}></img>
          </div>
          <div className="LotDetail--title_block">
            <div >
              <div className="LotDetail--title">{props.title}</div>
              <div className="LotDetail--subtitle">{props.size}</div>
            </div>
            <div className="LotDetail--title">{props.rate}</div>
          </div>
          <div>
            {
            props.logedin && (
            <Button onClick={(event) => (window.location.href = "/edit")}>
              Edit
            </Button>
             )}
            {props.logedin && <Button>Delete</Button>}
          </div>
          <div className="LotDetail--description">
            {props.lot_description}
          </div>
          <ul className="LotDetail--list">
            <li>{props.lot_type}</li>
            <li>{props.condition_rating}</li>
            <li>{props.is_irrigated}</li>
            <li>{props.suggested_term}</li>
            <li>{props.available_date}</li>
          </ul>
        </div>
        <div className="LotDetail--image_list">
                {props.images.map(image =>{
                  return (
                  <img className="LotDetail--image_list_item" src={image} />
                  )
                })}
        </div>
        {/* {props.isOwned &&
          (
          <div className="App">
          <ImageList
            imageUrls={props.images}
          />
        </div>
          )} */}
      </section>
  </main>
);
}

export default LotDetail;