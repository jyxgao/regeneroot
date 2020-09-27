/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

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

        res.send({ user: { id: userId, name: user.name, email: user.email } });
      })
      .catch((err) => res.send({ error: err.message }));
  });

  router.post('/logout', (req, res) => {
    req.session = null;
    res.send({});
  })

  return router;
};
