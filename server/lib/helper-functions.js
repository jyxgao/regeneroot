const pool = require("./db");

const convertLotToNested = function (rows) {
  let lot = {};
  let imageArr = [];

  for (let row of rows) {
    imageArr.push(row["image_url"]);
  }
  lot = rows[0];
  delete lot["image_url"];
  lot["image_url"] = imageArr;
  return lot;
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
        console.log(res.rows);
        for (let lot of lots) {
          for (let image of res.rows) {
            if (lot.lot_id === image.lot_id) {
              // if lot does not have images key, create
              if (!lot.images) {
                lot.images = [image.image_url];
                lotsWithImages.push(lot);
              } else {
                lot.images.push(image.image_url);
                lotsWithImages.push(lot);
              }
            }
          }
        }
        lotsWithImages = [...new Set(lotsWithImages)];
        return lotsWithImages;
      });
  }
  return [];
};

exports.addImagesToLot = addImagesToLot;
