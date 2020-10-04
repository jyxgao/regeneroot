const express = require("express");
const router = express.Router();

module.exports = function (router, database) {
  // get all messages by lot and other user
  router.get("/:lot_id/messages/:other_id", (req, res) => {
    const lotId = req.params.lot_id;
    const userId = req.session.user_id;
    const otherId = req.params.other_id;
    console.log("lotid", lotId)
    console.log("userid", userId);
    console.log("otheruserid", otherId)
    if (!userId) {
      res.send({ message: "You are not logged in" });
      return;
    }

    database
      .getAllMessagesByLotIdAndUserIds(userId, otherId, lotId)
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
    const otherId = req.body.other_id;
    const text = req.body.text_body;

    if (!userId) {
      res.send({ message: "You are not logged in" });
      return;
    }
    database
      .addNewMessage(lotId, userId, otherId, text)
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
