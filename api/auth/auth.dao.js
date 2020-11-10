const db = require('../../usersData.mock.json');







const _createUser = (newUser, cb) => {
  /**
   * TODO: aca tendria que agarar el json existente
   * *     y ponele que apendearle el nuevo user creado
   */
};
const _loginUser = (userData, cb) => {
  /**
   * TODO: aca tengo que comparar lo que me llego con
   * *     la base de datos para ver si el usuario existe
   */
};



module.exports = {
  create: _createUser,
  login: _loginUser
}
