const Auth = require('./auth.controller');

module.exports = (routes) => {
  routes.post('/register', Auth.createUser);
  routes.post('/login', Auth.login);
}
