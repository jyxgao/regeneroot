const database = require("./lib/database");
const apiRoutes = require("./routes/apiRoutes");
const userRoutes = require("./routes/userRoutes");
const messageRoutes = require("./routes/messageRoutes");

// load .env data into process.env
require("dotenv").config();

// Web server config
const PORT = process.env.PORT || 8080;
const ENV = process.env.ENV || "development";
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const morgan = require("morgan");
const cookieSession = require("cookie-session");

app.use(
  cookieSession({
    name: "session",
    keys: ["key1"],
  })
);

app.use(morgan("dev"));

// app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// api endpoints
const apiRouter = express.Router();
apiRoutes(apiRouter, database);
app.use("/api", apiRouter);

// user endpoints
const userRouter = express.Router();
userRoutes(userRouter, database);
app.use("/users", userRouter);

// messages endpoints
const messageRouter = express.Router();
messageRoutes(messageRouter, database);
app.use("/lots", messageRouter);

// app.get("/", (req, res) => {
//   res.render("index");
// });

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});

module.exports = app;
