const fs = require("fs");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { send } = require("process");
const SECRET_KEY = fs.readFileSync("./certs/private.pem", "utf8");
const User = require("./user.dao");
const userData = require("../../usersData.mock.json");


exports.getUser = (req, res, next) => {
  var reqUser = userData.find((user) => {
    let isValidMail = user.userMail === req.body.mail;
    let isValidPassword = user.userPassword === req.body.password;

    if (isValidMail && isValidPassword) {

      user.token = jwt.sign({ id: user.userId}, SECRET_KEY, { algorithm: "HS256" });
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
}

exports.getUsersList = (req, res, next) => {
  res.json(userData);
};
