const fs = require("fs");
const User = require("./auth.dao");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { send } = require("process");
const SECRET_KEY = fs.readFileSync("./certs/private.pem", "utf8");
const userData = require("../../usersData.mock.json");

exports.createUser = (req, res, next) => {
  const newUser = {
    name: req.body.name,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password),
  };

  // User.create(newUser, (err, user) => {
  //   if (err) res.status(500).send("Server Error");
  //   const expiresIn = 24 * 60 * 60;
  //   const accessToken = jwt.sign({ id: user.id }, SECRET_KEY, {
  //     alg: "PS384",
  //     typ: "JWT",
  //     exp: expiresIn,
  //   });

  //   res.send({ user });
  // });
};

exports.loginUser = (req, res, next) => {
  if (err) res.status(500).send("Server Error");
  const userData = {
    email: req.body.email,
    password: req.body.password,
  };

  // /**
  //  * ! parte copiada del index aun no importe el json de ""DB""
  //  * ! seguro que falla cuando lo haga borrar esto
  //  */
  // var reqUser = userData.find((user) => {
  //   let isValidMail = user.userMail === req.body.mail;
  //   if (isValidMail) {
  //     let isValidPassword = bcrypt.compareSync(
  //       user.userPassword,
  //       req.body.password
  //     );

  //     if (isValidPassword) {

  //       user.isValidUser = true;
  //       const expiresIn = 24 * 60 * 60;
  //       const accessToken = jwt.sign({ id: user.id }, SECRET_KEY, {
  //         alg: "PS384",
  //         typ: "JWT",
  //         exp: expiresIn,
  //       });

  //       let dataUser = {
  //         name: user.userName,
  //         email: user.userMail,
  //         password: user.userPassword,
  //         expiresIn: expiresIn,
  //         accessToken: accessToken,
  //         isValidUser: true
  //       };
  //       return dataUser;
  //     }
  //   }
  //   return false;
  // });

  // if (reqUser) {
  //   res.json(reqUser);
  // } else {
  //   res.status(409).json({ msg: "Somethimg was wrong!!" });
  // }

  // User.login(userData, (err, user) => {
  //   /**
  //    * TODO: aca tendria que acer.... algo
  //    * *      para suplantar la funcion de mongo
  //    * https://youtu.be/KyyzhRqkJRA?t=1238
  //    */
  // });
};

exports.login = (req, res, next) => {
  var reqUser = userData.find((user) => {
    let isValidMail = user.userMail === req.body.mail;
    let isValidPassword = user.userPassword === req.body.password;

    if (isValidMail && isValidPassword) {
      user.isValidUser = true;
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
};
