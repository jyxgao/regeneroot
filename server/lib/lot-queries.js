const pool = require("./db");

// get all lots order by most recent
const getAllLotsByMostRecent = function (limit = 10) {
  const values = [limit];

  return pool
    .query(
      `
    SELECT *, lots.id AS lot_id
    FROM lots
    JOIN images ON lots.id = lot_id
    ORDER BY created_at DESC
    LIMIT $1;
    `,
      values
    )
    .then((res) => {
      return res.rows;
    })
    .catch((err) => {
      console.log(err);
    });
};

// get single lot by lot Id
const getLotByLotId = function (lotId) {
  return pool
    .query(
      `
    SELECT *, lots.id AS lot_id
    FROM lots
    JOIN images ON lots.id = lot_id
    WHERE lots.id = $1;
    `,
      [lotId]
    )
    .then((res) => {
      return res.rows;
    })
    .catch((err) => {
      console.log(err);
    });
};

// get all lots by owner order by most recent
const getAllLotsByOwnerId = function (userId, limit = 10) {
  const values = [userId, limit];

  return pool
    .query(
      `
    SELECT *, lots.id AS lot_id
    FROM lots
    JOIN users ON lots.owner_id = users.id
    JOIN images ON lots.id = lot_id
    WHERE users.id = $1
    ORDER BY created_at DESC
    LIMIT $2;
    `,
      values
    )
    .then((res) => {
      return res.rows;
    })
    .catch((err) => {
      console.log(err);
    });
};

// get all lots leased by renter order by most recent
const getAllLotsByRenterId = function (userId, limit = 10) {
  const values = [userId, limit];

  return pool
    .query(
      `
    SELECT *,
    FROM leases
    JOIN lots ON leases.lot_id = lots.id
    WHERE leases.renter_id = $1
    ORDER BY created_at DESC
    LIMIT $2
  `,
      values
    )
    .then((res) => {
      return res.rows;
    })
    .catch((err) => {
      console.log(err);
    });
};

// get all lots by city name and order by most recent
const getAllLotsByCity = function (cityName, limit = 10) {
  const values = [cityName, limit];

  return pool
    .query(
      `
    SELECT *, lots.id AS lot_id
    FROM lots
    JOIN images ON lots.id = lot_id
    WHERE city = $1
    ORDER BY created_at DESC
    LIMIT $2;
  `,
      values
    )
    .then((res) => {
      return res.rows;
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = {
  getAllLotsByMostRecent,
  getAllLotsByOwnerId,
  getAllLotsByRenterId,
  getAllLotsByCity,
  getLotByLotId,
};
