const pool = require("./db");

// add new lot to lots
const addNewLot = function (lotObj, imageArr) {
  const values = [
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
      values
    )
    .then((res) => {
      const lotId = res.rows[0].lot_id;
      for (const image of images)
      return res.rows;
    })
    .catch((err) => {
      console.log(err);
    });
};


module.exports = {
  addNewLot,
}
