/*
 * DEV DEPENDENCIES
 */
const path = require("path");
const fs = require("fs");
const express = require("express");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const userData = require("./usersData.mock.json");
const SECRET_KEY = fs.readFileSync("./private.pem", "utf8");
const staticDirPath = path.join(__dirname, "./public");
const port = 7000;

const app = express();

/**---- Get Api Router ----**/
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

/**---- Point static path to dist ----**/
app.use(express.static(staticDirPath));

app.get("/", (req, res) => res.send("Hellou gorl"));

/**
 * * TRHIS IS A PUBLIC ENDPOINT
 */
app.get("/public", (req, res) => {
  let message = {
    message:
      "If you can read this message is because you are an authorized person 👍",
  };
  res.json({ message: "hola secret" });
});

/**
 * * THIS ENDPOINT REQUIRE AUTENTICATION
 */
app.get("/users", isAuthenticated, (req, res) => {
  res.json(userData);
});

app.get("/user", isAuthenticated, (req, res) => {
  let user = userData.find((user) => {
    let isValidMail = user.userMail === req.mail;
    let isValidPassword = user.userPassword === req.password;

    if (isValidMail && isValidPassword) {
      return user;
    }
    return false;
  });
  let privateKey = fs.readFileSync("./certs/private.pem", "utf8");
  user.token = jwt.sign({ body: "stuff" }, privateKey, { algorithm: "HS256" });

  res.json(user);
});

app.post("/login", (req, res) => {
  var reqUser = userData.find((user) => {
    let isValidMail = user.userMail === req.body.mail;
    let isValidPassword = user.userPassword === req.body.password;

    if (isValidMail && isValidPassword) {

      //user.token = jwt.sign({ id: user.userId}, SECRET_KEY, { algorithm: "HS256" });
      const expiresIn = 24 * 60 * 60;
      const accessToken = jwt.sign({ id: user.userId}, SECRET_KEY, {
        header: {
          typ: "JWT",
          algorithm: "HS256",
          expiresIn: expiresIn
        },
      });

      user.isValidUser = true;
      user.expiresIn = expiresIn;
      user.accessToken = accessToken;

      return user;
    }
    return false;
  });

  console.log(reqUser)

  if (reqUser) {
    res.json(reqUser);
  } else {
    res.status(409).json({ msg: "Somethimg was wrong!!" });
  }
});

app.get("/jwt", (req, res) => {
  let privateKey = fs.readFileSync("./private.pem", "utf8");
  let token = jwt.sign({ body: "stuff" }, privateKey, { algorithm: "HS256" });
  res.send(token);
});

//----Helpers----//
// function validateUser ( user ) {
//     let isValidMail = user.userEmail === req.body.email;
//     let isValidPassword= user.userPassword === req.body.password;

//     if (isValidMail && isValidPassword) {
//         user.isValidUser = true;
//         return user;
//     }
//     return false;
// }

function isAuthenticated(req, res, next) {
  if (typeof req.headers.authorization !== "undefined") {
    let token = req.headers.authorization.split(" ")[1];
    let privateKey = fs.readFileSync("./certs/private.pem", "utf8");

    jwt.verify(token, privateKey, { algorithms: "HS256" }, (err, decoded) => {
      if (err) res.status(500).json({ error: "Not Authorized" });

      console.log(decoded);

      return next();
    });
  } else {
    res.status(500).json({ error: "Not Authorized" });
  }
}

app.listen(port, () => console.log(`App running on http://localhost:${port}`));
