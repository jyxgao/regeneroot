const database = require('./lib/database');
const apiRoutes = require('./routes/apiRoutes');
const userRoutes = require('./routes/userRoutes');

// load .env data into process.env
require('dotenv').config();

// Web server config
const PORT       = process.env.PORT || 8080;
const ENV        = process.env.ENV || "development";
const express    = require("express");
const bodyParser = require("body-parser");
const app        = express();
const morgan     = require('morgan');
const cookieSession = require('cookie-session');

app.use(cookieSession({
  name: 'session',
  keys: ['key1']
}));

// PG database client/connection setup
// const { Pool } = require('pg');
// const dbParams = require('./lib/db.js');
// const db = new Pool(dbParams);
// db.connect();

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

// app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// api endpoints
const apiRouter = express.Router();
apiRoutes(apiRouter, database);
app.use('/api', apiRouter)


// /user/endpoints
const userRouter = express.Router();
userRoutes(userRouter, database);
app.use('/users', userRouter);

// // createa and update lots
// app.use("/", lotsRoutes(db));

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).
// app.get("/", (req, res) => {
//   res.render("index");
// });

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});

module.exports = app;
