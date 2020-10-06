const express = require("express");
const router = express.Router();

module.exports = function (router, database) {

  router.get("/lots/search", (req, res) => {
    database
      .getAllLotsByQuery(req.query)
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        res.json({ err: err.message });
      });
  });

  router.get("/lots/owned", (req, res) => {
    const userId = req.session.user_id;
    database
      .getAllLotsByOwnerId(userId)
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        res.json({ error: err.message });
      });
  });

  router.get("/lots/leased", (req, res) => {
    const userId = req.session.user_id;
    database
      .getAllLotsByRenterId(userId)
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        res.json({ error: err.message });
      });
  });
  router.get("/lots/:lot_id", (req, res) => {
    const lotId = req.params.lot_id;

    database
      .getLotByLotId(lotId)
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        res.json({ error: err.message });
      });
  });

  router.get("/lots/cities/:city", (req, res) => {
    let city = req.params.city;

    database
      .getAllLotsByCity(city)
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        res.json({ error: err.message });
      });
  });

  router.get("/lots", (req, res) => {
    database
      .getAllLotsByMostRecent()
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        res.json({ error: err.message });
      });
  });

  // create new lot
  router.post("/lots", (req, res) => {
    console.log("submitting form...")
    const userId = req.session.user_id;
    const city = req.body.city.toLowerCase();
    const country = req.body.country.toLowerCase();
    const post_code = req.body.post_code.replace(/ /g, "");
    const images = req.body.images;

    // console.log(req.body)
    delete req.body.images;

    const lot = { ...req.body, city, post_code, country, owner_id: userId };

    if (!userId) {
      res.send({ message: "You are not logged in" });
      return;
    }

    database
      .addNewLot(lot, images)
      .then((data) => {
        // if frontend wants data:
        res.send(data);
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
    database
      .deleteLotById(userId, lotId)
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
    const lotId = parseInt(req.params.lot_id);
    const city = req.body.city.toLowerCase();
    const country = req.body.country.toLowerCase();
    const post_code = req.body.post_code.replace(/ /g, "");
    const images = req.body.images;
    delete req.body.images;


    const lot = { ...req.body, owner_id: userId, city, post_code, country };
    if (!userId) {
      res.send({ message: "You are not logged in" });
      return;
    }
    database
      .updateLotById(lotId, lot, images)
      .then((data) => {
        // if frontend wants data:
        res.send(data);
        // else:
        // res.send({});
      })
      .catch((err) => {
        res.json({ error: err.message });
      });
  });

    //get all leases
    router.get("/leases", (req,res) => {
    database
      .getAllLeasesByMostRecent()
      .then((data) => {
        // if frontend wants data:
        res.send(data);
      })
      .catch((err) => {
        res.json({ error: err.message });
      });
    })

    //create new lease - purchase
    router.post("/leases", (req,res) => {
    const renterId = req.session.user_id;
    const leaseInfo = {...req.body, renter_id: renterId}

    database
      .addNewLease(leaseInfo, renterId)
      .then((data) => {
        // if frontend wants data:
        res.send(data);
      })
      .catch((err) => {
        res.json({ error: err.message });
      });
    })

  return router;
};
