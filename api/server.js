// DEPENDENCIES
const path = require('path');
const express = require('express');
const bodyParser = require("body-parser");
const cors = require("cors");

// API DEPENDENCIES
const { baseApiUrl, apiVersion, port } = require('../config/index');
const userRoutes = require('./user/user.routes');
const authRoutes = require('./auth/auth.routes');

const app = express();
const router = express.Router();
const staticDirPath = path.join(__dirname, "../public");
const basePath = `${apiVersion}${baseApiUrl}`;

// ROUTES CONFIGURATION
// for acept crros domine request
app.use(cors());
// for parsing application/x-www-form-urlencoded
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
// parse application/json
app.use(bodyParser.json());
// Point static path to dist
app.use(express.static(staticDirPath));
// Base api routes
app.use(basePath, router);

userRoutes(router);
authRoutes(router);
router.get('/', (req, res) => res.send(`http://localhost:${port}${basePath}`));
app.use(router);
/********************/

app.listen( port, () => {
  let info = {
    AppRunningOn : `App running on http://localhost:${port}/`,
    apiRunningOn: `http://localhost:${port}${basePath}`,
  }
  console.log(info);
});
