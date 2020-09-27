const pool = require("./db");

// get all lots order by most recent
const getAllLotsByMostRecent = function (limit = 10) {
  const queryParams = [limit];

  return pool
    .query(
      `
    SELECT *, lots.id AS lot_id
    FROM lots
    JOIN images ON lots.id = lot_id
    ORDER BY created_at DESC
    LIMIT $1;
    `,
      queryParams
    )
    .then((res) => {
      return res.rows;
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getAllLotsByMostRecent = getAllLotsByMostRecent;

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

exports.getLotByLotId = getLotByLotId;

// get all lots by owner order by most recent
const getAllLotsByOwnerId = function (userId, limit = 10) {
  const queryParams = [userId, limit];

  return pool
    .query(
      `
    SELECT *, lots.id AS lot_id
    FROM lots
    JOIN users ON lots.owner_id = users.id
    JOIN images ON lots.id = lot_id
    WHERE owner_id = $1
    ORDER BY created_at DESC
    LIMIT $2;
    `,
      queryParams
    )
    .then((res) => {
      return res.rows;
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getAllLotsByOwnerId = getAllLotsByOwnerId;

// get all lots leased by renter order by most recent
const getAllLotsByRenterId = function (userId, limit = 10) {
  const queryParams = [userId, limit];

  return pool
    .query(
      `
    SELECT *, leases.id AS lease_id
    FROM leases
    JOIN lots ON leases.lot_id = lots.id
    JOIN images ON lots.id = images.lot_id
    WHERE leases.renter_id = $1
    ORDER BY leases.created_at DESC
    LIMIT $2;
  `,
      queryParams
    )
    .then((res) => {
      return res.rows;
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getAllLotsByRenterId = getAllLotsByRenterId;

// get all lots by city name and order by most recent
const getAllLotsByCity = function (cityName, limit = 10) {
  const queryParams = [cityName, limit];

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
      queryParams
    )
    .then((res) => {
      return res.rows;
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getAllLotsByCity = getAllLotsByCity;

// add new lot to lots
const addNewLot = function (lot, imageArr) {
  console.log(lot);
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
    lot.created_at,
    lot.is_active,
    lot.owner_id,
  ];
  return pool
    .query(
      `
    INSERT INTO lots (
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
      country,
      post_code,
      lat,
      long,
      created_at,
      is_active,
      owner_id
    )
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19)
    RETURNING *, id AS lot_id;
  `,
      queryParams
    )
    .then((res) => {
      console.log(imageArr);

      const lotId = res.rows[0].lot_id;

      for (let image of imageArr) {
        addImage(lotId, image);
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.addNewLot = addNewLot;

const addImage = function (lotId, imageUrl) {
  return pool
    .query(
      `
  INSERT INTO images (lot_id, image_url)
  VALUES ($1, $2)
  RETURNING *;
`,
      [lotId, imageUrl]
    )
    .then((res) => {
      return res.rows;
    })
    .catch((err) => {
      console.log(err);
    });
};
exports.addImage = addImage;

// delete lot by Id
const deleteLotById = function (userId, lotId) {
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
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.deleteLotById = deleteLotById;

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
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.updateLotById = updateLotById;

const getUserById = function (userId) {
  return pool
    .query(
      `SELECT * FROM users
    WHERE id = $1;
    `,
      [userId]
    )
    .then((res) => {
      if (res) {
        return res.rows[0];
      }
      return null;
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getUserById = getUserById;
