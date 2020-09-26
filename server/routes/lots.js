const express = require("express");
const router = express.Router();

const { addNewLot, deleteLotById, updateLotById } = require("../lib/lot-mod");

// create new lot
router.post("/lots", (req, res) => {
  const userId = req.session.userId;
  addNewLot({ ...req.body, owner_id: userId })
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

  deleteLotById(lotId)
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

  updateLotById(lotId, req.body).then(data => {
    res.send({data});
  }).catch(err => {
    res.json({error: err.message})
  })
});
module.exports = router;
