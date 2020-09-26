/*
 * All routes for Widgets are defined here
 * Since this file is loaded in server.js into api/widgets,
 *   these routes are mounted onto /widgets
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require("express");
const router = express.Router();

const {
  getAllLotsByMostRecent,
  getLotByLotId,
  getAllLotsByOwnerId,
  getAllLotsByRenterId,
  getAllLotsByCity,
} = require("../lib/lot-queries");

const {
  addNewLot,
} = require("../lib/lot-mod");

router.get("/lots", (req, res) => {
  getAllLotsByMostRecent()
    .then((data) => {
      res.json({ data });
    })
    .catch((err) => {
      res.json({ error: err.message });
    });
});

router.get("/lots/:lot_id", (req, res) => {
  const lotId = req.params.lot_id;

  getLotByLotId(lotId)
    .then((data) => {
      res.json({ data });
    })
    .catch((err) => {
      res.json({ error: err.message });
    });
});

router.get("/lots/owned", (req, res) => {
  const userId = req.session.user_id;
  getAllLotsByOwnerId(userId)
    .then((data) => {
      res.json({ data });
    })
    .catch((err) => {
      res.json({ error: err.message });
    });
});

router.get("/lots/leased", (req, res) => {
  const userId = req.session.user_id;
  getAllLotsByRenterId(userId)
    .then((data) => {
      res.json({ data });
    })
    .catch((err) => {
      res.json({ error: err.message });
    });
});

router.get("/lots/cities/:city", (req, res) => {
  const city = req.params.city;
  getAllLotsByCity(city)
    .then((data) => {
      res.json({ data });
    })
    .catch((err) => {
      res.json({ error: err.message });
    });
});

// create new lot
router.post("/lots", (req, res) => {
  const userId = req.session.userId;
  addNewLot({...req.body, owner_id: userId})
  .then(lot => {
    res.send(lot);
  }).catch(err => {
    res.json({error: err.message})
  })
});

module.exports = router;
