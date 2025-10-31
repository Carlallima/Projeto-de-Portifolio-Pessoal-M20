const userModel = require('../models/userModel');

function registerUser({ name, email, password, role }) {
  if (userModel.findByEmail(email)) {
    const err = new Error('Email já cadastrado');
    err.status = 400;
    throw err;
  }
  const user = userModel.createUser({ name, email, password, role });
  return user;
}

function listUsers() {
  return userModel.getAllUsers();
}

function getUserById(id) {
  const user = userModel.findById(id);
  if (!user) {
    const err = new Error('Usuário não encontrado');
    err.status = 404;
    throw err;
  }
  return user;
}

module.exports = { registerUser, listUsers, getUserById };
