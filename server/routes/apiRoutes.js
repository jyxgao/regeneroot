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
    let city = req.params.city;
    city = city[0].toUpperCase() + city.slice(1);

    database.getAllLotsByCity(city)
      .then((data) => {
        res.json({ data });
      })
      .catch((err) => {
        res.json({ error: err.message });
      });
  });

  // NEED IMAGES
  // create new lot
  router.post("/lots", (req, res) => {
    const userId = req.session.user_id;
    database.addNewLot({ ...req.body, owner_id: userId })
      .then((data) => {
        // if frontend wants data:
        res.send({ data });
        // else:
        // console.log(data)
      })
      .catch((err) => {
        res.json({ error: err.message });
      });
  });

  // delete lot
  router.post("/lots/:lot_id/delete", (req, res) => {
    const userId = req.session.user_id;
    const lotId = req.params.lot_id;

    database.deleteLotById(lotId)
      .then((data) => {
        // if frontend wants data:
        // res.send({ data });
        // else:
        console.log(data);
      })
      .catch((err) => {
        res.json({ error: err.message });
      });
  });

  // update lot
  router.post("/lots/:lot_id", (req, res) => {
    const userId = req.session.user_id;
    const lotId = req.params.lot_id;

    updateLotById(lotId, req.body)
      .then((data) => {
        // if frontend wants data:
        res.send({ data });
        // else:
        // console.log(data)
      })
      .catch((err) => {
        res.json({ error: err.message });
      });
  });
  return router;
};
