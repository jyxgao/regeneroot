const pool = require("./db");
const {
  convertLotToNested,
  addImagesToLot,
  convertCoordsToObject,
  groupMessagesByRenterId,
} = require("./helper-functions");
const { query } = require("./db");
// get all lots order by most recent
const getAllLotsByMostRecent = function (limit = 10) {
  const queryParams = [limit];

  return pool
    .query(
      `
      SELECT *, lots.id AS lot_id
      FROM lots
      ORDER BY created_at DESC
      LIMIT $1;
      `,
      queryParams
    )
    .then((res) => {
      return addImagesToLot(res.rows);
    })
    .then((res) => {
      return convertCoordsToObject(res);
    })
    .catch((err) => {
      console.log(err);
      // throw err
    });
};

/*
alice: "x returns a promise (called p)"
    (for opt1/opt2, assume that x is a .then)
    (opt1 is: the .then callback returned non-promise (incl undefined))
    (opt2 is: the .then callback returned a promise)
bob: "what time-or-event causes p to resolve/reject?"
        opt1: ASAP (i.e. when the parent promise resolves, plus 1ms)
        opt2: when the returned promise resolves
bob: "under what circumstances does p resolve (under what does it reject)"
bob: "if it resolves, to what value does it resolve?"
        opt1: whatever you returned
        opt2: whatever the promise you returned would resolve to
bob: "if it rejects, to what value does it reject?"
*/

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
      return convertLotToNested(res.rows);
    })
    .then((res) => {
      return convertCoordsToObject(res);
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
    WHERE owner_id = $1
    ORDER BY created_at DESC
    LIMIT $2;
    `,
      queryParams
    )
    .then((res) => {
      return addImagesToLot(res.rows);
    })
    .then((res) => {
      return convertCoordsToObject(res);
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
    SELECT *, leases.id AS lease_id, leases.created_at AS time_leased
    FROM leases
    JOIN lots ON leases.lot_id = lots.id
    WHERE leases.renter_id = $1
    ORDER BY leases.created_at DESC
    LIMIT $2;
  `,
      queryParams
    )
    .then((res) => {
      return addImagesToLot(res.rows);
    })
    .then((res) => {
      return convertCoordsToObject(res);
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
    WHERE city = $1
    ORDER BY created_at DESC
    LIMIT $2;
  `,
      queryParams
    )
    .then((res) => {
      return addImagesToLot(res.rows);
    })
    .then((res) => {
      return convertCoordsToObject(res);
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getAllLotsByCity = getAllLotsByCity;

// add new lot to lots
const addNewLot = function (lot, imageArr) {
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
const updateLotById = function (lotId, lot, imageArr) {
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
    WHERE lots.id = $18
    RETURNING *, id AS lot_id;
    `,
      queryParams
    )
    .then((res) => {
      const lotId = res.rows[0].lot_id;
      // console.log(imageArr);
      for (let image of imageArr) {
        updateImage(lotId, image);
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.updateLotById = updateLotById;

// const updateImage = function (lotId, imageUrl) {
//   return pool
//     .query(
//       `
//   UPDATE images
//   SET
//   image_url = $1
//   WHERE lot_id = $2
//   RETURNING *;
// `,
//       [imageUrl, lotId]
//     )
//     .then((res) => {
//       return res.rows;
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// };
const updateImage = function (lotId, imageUrl) {
  // console.log("TEst ",lotId,imageUrl);
  return pool
    .query(
      `
  UPDATE images
  SET
  image_url = $1
  WHERE lot_id = $2 and Id = (select id from images where lot_id = $2 and image_url=$1)
  RETURNING *;
`,
      [imageUrl, lotId]
    )
    .then((res) => {
      return res.rows;
    })
    .catch((err) => {
      console.log(err);
    });
};
exports.updateImage = updateImage;

const getUserById = function (userId) {
  return pool
    .query(
      `SELECT first_name, last_name, username, email, avatar
      FROM users
      WHERE id = $1;
    `,
      [userId]
    )
    .then((res) => {
      return res.rows[0];
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getUserById = getUserById;

const getUserByEmail = function (email) {
  return pool
    .query(
      `
  SELECT users.id AS user_id, first_name, last_name, username, email, avatar
  FROM users
  WHERE users.email = $1
  `,
      [email]
    )
    .then((res) => {
      if (res.rows[0]) {
        // console.log(res.rows[0])
        return res.rows[0];
      } else {
        return ({ message: "User is not registered" });
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getUserByEmail = getUserByEmail;

// search API
const getAllLotsByQuery = function (options, limit = 10) {
  const queryParams = [];

  let queryString = `
  SELECT *, lots.id AS lot_id
  FROM lots
`;
  // for (const option in options) {
  //   if (!queryParams.length) {
  //     queryString += `WHERE `;
  //   }
  // }
  if (options.city) {
    queryParams.push(`%${options.city}%`);
    queryString += queryParams.length === 1 ? `WHERE ` : `AND `;
    queryString += `lots.city LIKE $${queryParams.length} `;
  }

  if (options.country) {
    queryParams.push(`%${options.country}%`);
    queryString += queryParams.length === 1 ? `WHERE ` : `AND `;
    queryString += `lots.country LIKE $${queryParams.length} `;
  }

  if (options.minimum_size) {
    queryParams.push(options.minimum_size);
    queryString += queryParams.length === 1 ? `WHERE ` : `AND `;
    queryString += `lots.size >= $${queryParams.length} `;
  }

  if (options.maximum_size) {
    queryParams.push(options.maximum_size);
    queryString += queryParams.length === 1 ? `WHERE ` : `AND `;
    queryString += `lots.size <= $${queryParams.length} `;
  }

  queryString += ` ORDER BY lots.created_at DESC`;
  queryParams.push(limit);
  queryString += `
  LIMIT $${queryParams.length};
  `;

  // console.log(queryString);

  return pool
    .query(queryString, queryParams)
    .then((res) => {
      return addImagesToLot(res.rows);
    })
    .then((res) => {
      return convertCoordsToObject(res);
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getAllLotsByQuery = getAllLotsByQuery;

// messages
const getAllMessagesByLotIdAndUserIds = function (userId, otherId, lotId) {
  const queryParams = [userId, otherId, lotId];

  return pool
    .query(
      `
    SELECT messages.id AS message_id,
    owner_id AS owner_id,
    renter_id AS renter_id,
    lot_id AS lot_id,
    written_by AS written_by,
    users.username AS username,
    text_body AS text_body,
    messages.created_at AS created_at,
    users.avatar AS avatar
    FROM messages
    JOIN users ON messages.written_by = users.id
    WHERE messages.lot_id = $3
    AND ((messages.owner_id = $1 AND messages.renter_id = $2)
    OR (messages.owner_id = $2 AND messages.renter_id = $1))
    ORDER BY messages.created_at ASC
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

exports.getAllMessagesByLotIdAndUserIds = getAllMessagesByLotIdAndUserIds;

// messages as owner with many renters msgs
const getAllMessagesByLotIdAsOwner = (lotId, userId) => {
  const queryParams = [lotId, userId];

  return pool
    .query(
      `
    SELECT messages.id AS message_id,
    owner_id AS owner_id,
    renter_id AS renter_id,
    lot_id AS lot_id,
    written_by AS written_by,
    users.username AS username,
    text_body AS text_body,
    messages.created_at AS created_at,
    users.avatar AS avatar
    FROM messages
    JOIN users ON messages.written_by = users.id
    WHERE messages.lot_id = $1 AND messages.owner_id = $2
    ORDER BY messages.created_at ASC
    `,
      queryParams
    )
    .then((res) => {
      return groupMessagesByRenterId(res.rows);
    });
};

exports.getAllMessagesByLotIdAsOwner = getAllMessagesByLotIdAsOwner;
// const getMessagesAndOwnerByLotIdUserId = function (lotId, userId) {
//   const queryParams = [lotId, userId];
//   return pool
//     .query(
//       `
//   SELECT *, messages.id AS message_id, users.username AS owner_username
//   FROM messages
//   JOIN users ON messages.owner_id = users.id
//   WHERE messages.lot_id = $1 AND messages.renter_id = $2
//   ORDER BY messages.created_at DESC
//   `,
//       queryParams
//     )
//     .then((res) => {
//       return res.rows;
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// };
// exports.getMessagesAndOwnerByLotIdUserId = getMessagesAndOwnerByLotIdUserId;

// const getMessagesAndRenterByLotIdUserId = function (lotId, userId) {
//   const queryParams = [lotId, userId];
//   return pool
//     .query(
//       `
//       SELECT *, messages.id AS message_id, users.username AS renter_username
//       FROM messages
//       JOIN users ON messages.renter_id = users.id
//       WHERE messages.lot_id = $1 AND messages.owner_id = $2
//       ORDER BY messages.created_at DESC
//   `,
//       queryParams
//     )
//     .then((res) => {
//       return res.rows;
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// };
// exports.getMessagesAndRenterByLotIdUserId = getMessagesAndRenterByLotIdUserId;

const addNewMessage = function (lotId, userId, otherId, text) {
  console.log("submitting message...");
  const queryParams = [lotId, userId, otherId, text, userId];
  return pool
    .query(
      `
    INSERT INTO messages (
      lot_id,
      owner_id,
      renter_id,
      text_body,
      written_by
    )
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *, id AS message_id;
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
exports.addNewMessage = addNewMessage;

const getAllLeasesByMostRecent = function (limit = 10) {
  const queryParams = [limit];

  return pool
    .query(
      `
      SELECT *, leases.id AS lease_id
      FROM leases
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
    })
}

exports.getAllLeasesByMostRecent = getAllLeasesByMostRecent;

const addNewLease = function(leaseInfo, renterId) {
  const lotId = leaseInfo.lot_id
  console.log("leaseInfo IN DATABASE", leaseInfo)
  console.log("LOT ID IN DATABASE", lotId)
  const ownerId = leaseInfo.owner_id
  const termLength = leaseInfo.term_length
  const totalCost = leaseInfo.total_cost
  const queryParams = [lotId, ownerId, renterId, termLength, totalCost]
  return pool
    .query(
      `INSERT INTO leases (
        lot_id,
        owner_id,
        renter_id,
        term_length,
        total_cost
      )
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *, id AS lease_id;
      `, queryParams
      )
      .then((res) => {
        console.log("Purchase successful.")
        return res.rows;
      })
      .catch((err) => {
        console.log(err);
      })
};
exports.addNewLease = addNewLease;
