/*
 * All routes for Widgets are defined here
 * Since this file is loaded in server.js into api/widgets,
 *   these routes are mounted onto /widgets
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require("express");
const router = express.Router();

module.exports = function (router, database) {

  router.get("/lots/owned", (req, res) => {
    const userId = req.session.user_id;
    console.log(userId)
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

  router.get("/lots", (req, res) => {
    database.getAllLotsByMostRecent()
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
    console.log(req.body)
    const lot = {...req.body, owner_id: userId }
    const images = [req.body.images];
    database.addNewLot(lot, images)
      .then((data) => {
        // if frontend wants data:
        res.send({ data });
        // else:
        // res.send({});
      })
      .catch((err) => {
        res.json({ error: err.message });
      });
  });

  // actually delete lot record
  router.post("/lots/:lot_id/delete", (req, res) => {

    const userId = req.session.user_id;
    const lotId = req.params.lot_id;
    if (!userId) {
      res.send({ message: "You are not logged in" });
      return;
    }
    database.deleteLotById(userId, lotId)
      .then((data) => {
        res.send({});
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
        // res.send({});
      })
      .catch((err) => {
        res.json({ error: err.message });
      });
  });
  return router;
};
