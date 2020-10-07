const pool = require("./db");

const convertLotToNested = function (rows) {
  let lot = {};
  let imageArr = [];
  if (rows.length) {
    for (let row of rows) {
      imageArr.push(row["image_url"]);
    }
    lot = rows[0];
    delete lot["image_url"];
    lot.images = imageArr;
    return [lot];
  }
  return [];
};

exports.convertLotToNested = convertLotToNested;

const addImagesToLot = function (lots) {
  let lotIDs = [];
  for (let lot of lots) {
    const lotId = lot.lot_id;
    lotIDs.push(lotId);
  }

  if (lotIDs.length) {
    return pool
      .query(
        `
    SELECT lot_id, image_url
    FROM images
    WHERE lot_id IN (${lotIDs})
    ORDER BY lot_id;
  `
      )
      .then((res) => {
        let lotsWithImages = [];
        for (let lot of lots) {

          for (let image of res.rows) {
            if (lot.lot_id === image.lot_id) {
              // if lot does not have images key, create
              if (!lot.images) {
                lot.images = [image.image_url];
                // lotsWithImages.push(lot);
              } else {
                lot.images.push(image.image_url);
              }
            }
          }
          lotsWithImages.push(lot);
        }
        lotsWithImages = [...new Set(lotsWithImages)];
        return lotsWithImages;
      });
  }
  return [];
};

exports.addImagesToLot = addImagesToLot;

const convertCoordsToObject = function (lots) {
  let convertedLots = [];
  if (lots.length) {
    for (let lot of lots) {
      let convertedLot = {};
      // add location key to lot objs that contains lat and long obj
      const newLat = Number(lot.lat);
      const newLong = Number(lot.long);
      lot.location = { lat: newLat, lng: newLong };

      // iterate through keys of lot
      for (let key in lot) {
        // eliminate lat and long keys by copying the others
        if (key !== "lat" || key !== "long") {
          convertedLot[key] = lot[key];
        }
      }
      convertedLots.push(convertedLot);
    }
    return convertedLots;
  }
  return [];
};

exports.convertCoordsToObject = convertCoordsToObject;

const groupMessagesByRenterId = function (messages) {
  // input: [{renter_id: number, text: ... etc}, {}, {}...]
  //convert into { renter_id: [{msgObj}, {}, {}...],
  // retner_id: [{msgObj}, {}, {}...],
  //              }
  let convertedMessages = {};
  for (let message of messages) {
    // if renter id not in convertedMessages obj, add the key value
    if (!convertedMessages[message.renter_id]) {
      convertedMessages[message.renter_id] = [message];
      // else if renter id is found, push the message
    } else {
      convertedMessages[message.renter_id].push(message);
    }
  }
  return convertedMessages;
};

exports.groupMessagesByRenterId = groupMessagesByRenterId;
