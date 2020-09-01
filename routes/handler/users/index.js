const register = require('./register');
const login = require('./login');
const update = require('./update');
const getUser = require('./getUser');
const logout = require('./logout');

// Identifikasi semua service users handler
module.exports = {
  register,
  login,
  update,
  getUser,
  logout
};