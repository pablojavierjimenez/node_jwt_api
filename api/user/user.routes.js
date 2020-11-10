const Users = require('./user.controller');

module.exports = (routes) => {
  routes.post('/user', Users.getUser)
  routes.post('/users', Users.getUsersList)
}
