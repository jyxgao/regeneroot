/*
 * All routes for Widgets are defined here
 * Since this file is loaded in server.js into api/widgets,
 *   these routes are mounted onto /widgets
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require("express");
const router = express.Router();

module.exports = function (router, database) {
  router.get("/lots", (req, res) => {
    database.getAllLotsByMostRecent()
      .then((data) => {
        res.json({ data });
      })
      .catch((err) => {
        res.json({ error: err.message });
      });
  });

  router.get("/lots/:lot_id", (req, res) => {
    const lotId = req.params.lot_id;

    database.getLotByLotId(lotId)
      .then((data) => {
        res.json({ data });
      })
      .catch((err) => {
        res.json({ error: err.message });
      });
  });

  router.get("/lots/owned", (req, res) => {
    const userId = req.session.user_id;
    database.getAllLotsByOwnerId(userId)
      .then((data) => {
        res.json({ data });
      })
      .catch((err) => {
        res.json({ error: err.message });
      });
  });

  router.get("/lots/leased", (req, res) => {
    const userId = req.session.user_id;
    database.getAllLotsByRenterId(userId)
      .then((data) => {
        res.json({ data });
      })
      .catch((err) => {
        res.json({ error: err.message });
      });
  });

  router.get("/lots/cities/:city", (req, res) => {
    const city = req.params.city;
    database.getAllLotsByCity(city)
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
    database.addNewLot({ ...req.body, owner_id: userId })
      .then((data) => {
        res.send({ data });
      })
      .catch((err) => {
        res.json({ error: err.message });
      });
  });

  // delete lot
  router.post("/lots/:lot_id/delete", (req, res) => {
    const userId = req.session.userId;
    const lotId = req.params.lot_id;

    database.deleteLotById(lotId)
      .then((data) => {
        res.send({ data });
      })
      .catch((err) => {
        res.json({ error: err.message });
      });
  });

  // update lot
  router.post("/lots/:lot_id", (req, res) => {
    const userId = req.session.userId;
    const lotId = req.params.lot_id;

    updateLotById(lotId, req.body)
      .then((data) => {
        res.send({ data });
      })
      .catch((err) => {
        res.json({ error: err.message });
      });
  });
  return router;
};
