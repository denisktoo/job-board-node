const userRepository = require('../repositories/userRepository');

const register = (req, res) => {
  userRepository.registerUser(req, res);
};

const login = (req, res) => {
  userRepository.loginUser(req, res);
};

const getAllUsers = (req, res) => {
  userRepository.getAllUsers(req, res);
};

const getUserById = (req, res) => {
  userRepository.getUserById(req, res);
};

module.exports = {
  register,
  login,
  getAllUsers,
  getUserById
};
