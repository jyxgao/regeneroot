const pool = require("./db");

const addNewLot = function (lot) {
  const values = [
    lot.owner_id,
    lot.title,
    lot.size,
    lot.cost_per_month,
    lot.is_irrigated,
    lot.suggested_term,
    lot.condition_rating,
    lot.available_data,
    lot.lot_description,
    lot.is_leased,
    lot.street_address,
    lot.city,
    lot.country,
    lot.post_code,
    lot.created_at,
    lot.is_active,
  ];
  return pool.query(
    `
  `,
    values
  );
};
