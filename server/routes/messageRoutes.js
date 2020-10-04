const express = require("express");
const router = express.Router();

module.exports = function (router, database) {
  // get all messages by lot
  router.get("/:lot_id/messages", (req, res) => {
    const lotId = req.params.lot_id;
    const userId = req.session.user_id;
    console.log(userId);
    if (!userId) {
      res.send({ message: "You are not logged in" });
      return;
    }

    database
      .getAllMessagesByLotIdAndUserId(userId, lotId)
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        res.json({ err: err.message });
      });
  });

  // add new message
  router.post("/:lot_id/messages", (req, res) => {
    const lotId = req.params.lot_id;
    const userId = req.session.user_id;
    const ownerId = req.body.owner_id;
    const text = req.body.text_body;

    if (!userId) {
      res.send({ message: "You are not logged in" });
      return;
    }
    database
      .addNewMessage(lotId, userId, ownerId, text)
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.json({ error: err.message });
      });
  });

  // get message by lot and message id
  // router.get("/:lot_id/messages/:message_id", (req, res) => {});

  return router;
};
