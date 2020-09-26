const pool = require("./db");

// add new lot to lots
const addNewLot = function (lot, imageArr) {
  const queryParams = [
    lot.owner_id,
    lot.title,
    lot.size,
    lot.cost_per_month,
    lot.is_irrigated,
    lot.suggested_term,
    lot.condition_rating,
    lot.available_date,
    lot.lot_type,
    lot.lot_description,
    lot.is_leased,
    lot.street_address,
    lot.city,
    lot.country,
    lot.post_code,
    lot.lat,
    lot.long,
    lot.created_at,
    lot.is_active,
  ];
  return pool
    .query(
      `
    INSERT INTO lots (
      owner_id,
      title,
      size,
      cost_per_month,
      is_irrigated,
      suggested_term,
      condition_rating,
      available_date,
      lot_type,
      lot_description,
      is_leased,
      street_address,
      city,
      counry,
      post_code,
      lat,
      long,
      created_at,
      is_active
    )
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19)
    RETURNING *, id AS lot_id;
  `,
      queryParams
    )
    .then((res) => {
      const lotId = res.rows[0].lot_id;
      for (const image of imageArr) {
        return pool
          .query(
            `
          INSERT INTO images (lot_id, image_url)
          VALUES ($1, $2)
          RETURNING *;
        `,
            [lotId, image]
          )
          .then((res) => {
            return res.rows;
          });
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

// delete lot by Id
const deleteLotById = function (lotId) {
  return pool
    .query(
      `
    DELETE FROM lots
    WHERE lots.id = $1
    RETURNING *;
  `,
      [lotId]
    )
    .then((res) => {
      return res.rows;
    });
};

// edit lot by Id
const updateLotById = function (lotId, lot) {
  const queryParams = [
    lot.title,
    lot.size,
    lot.cost_per_month,
    lot.is_irrigated,
    lot.suggested_term,
    lot.condition_rating,
    lot.available_date,
    lot.lot_type,
    lot.lot_description,
    lot.is_leased,
    lot.street_address,
    lot.city,
    lot.country,
    lot.post_code,
    lot.lat,
    lot.long,
    lot.is_active,
    lotId,
  ];
  return pool
    .query(
      `
    UPDATE lots
    SET
    title = $1,
    size = $2,
    cost_per_month = $3,
    is_irrigated = $4,
    suggested_term = $5,
    condition_rating = $6,
    available_date = $7,
    lot_type = $8,
    lot_description = $9,
    is_leased = $10,
    street_address = $11,
    city = $12,
    country = $13,
    post_code = $14,
    lat = $15,
    long = $16,
    is_active = $17
    WHERE lots_id = $18
    RETURNING *;
    `,
      [queryParams]
    )
    .then((res) => {
      return res.rows;
    });
};

module.exports = {
  addNewLot,
  deleteLotById,
  updateLotById,
};
