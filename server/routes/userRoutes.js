const express = require("express");
const router = express.Router();

module.exports = function (router, database) {
  router.get("/login/:id", (req, res) => {
    req.session.user_id = req.params.id;
    res.redirect("/");
  });

  router.get("/me", (req, res) => {
    const userId = req.session.user_id;
    if (!userId) {
      res.send({ message: "You are not logged in" });
      return;
    }

    database
      .getUserById(userId)
      .then((user) => {
        if (!user) {
          res.send({ error: "User does not exist" });
          return;
        }

        res.send({
          user: {
            id: userId,
            first_name: user.first_name,
            last_name: user.last_name,
            username: user.username,
            email: user.email,
          },
        });
      })
      .catch((err) => res.send({ error: err.message }));
  });

  router.post("/logout", (req, res) => {
    req.session = null;
    res.send({});
  });

  return router;
};
