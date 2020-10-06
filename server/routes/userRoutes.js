const express = require("express");
const router = express.Router();

module.exports = function (router, database) {
  router.post("/login", (req, res) => {
    console.log("req.body", req.body);
    const email = req.body.email;
    database
      .getUserByEmail(email)
      .then((data) => {
        // console.log(data.user_id);
        if (data.user_id) {
          req.session.user_id = data.user_id;
          req.session.isLoggedIn = true;
          // console.log("/login post request", req.session.user_id);
          res.json({
            user: data,
            isLoggedIn: true,
          });
        } else {
          res.send(data);
        }
      })
      .catch((err) => {
        res.send({ error: err.message });
      });
  });

  router.get("/me", (req, res) => {
    const userId = req.session.user_id;
    const isLoggedIn = req.session.isLoggedIn;

    console.log("backend userid", userId);
    if (!userId) {
      res.send({ message: "You are not logged in" });
      return;
    }

    database
      .getUserById(userId)
      .then((user) => {
        // if (!user) {
        //   res.send({ error: "User does not exist" });
        //   return;
        // }

        res.json({
          id: userId,
          first_name: user.first_name,
          last_name: user.last_name,
          username: user.username,
          email: user.email,
          avatar: user.avatar,
          isLoggedIn: isLoggedIn,
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
