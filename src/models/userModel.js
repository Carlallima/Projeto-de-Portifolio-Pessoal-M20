const { v4: uuidv4 } = require('uuid');

const users = [];

function createUser({ name, email, password, role }) {
  const user = { id: uuidv4(), name, email, password, role };
  users.push(user);
  return user;
}

function findByEmail(email) {
  return users.find(u => u.email === email);
}

function findById(id) {
  return users.find(u => u.id === id);
}

function getAllUsers() {
  return users;
}

module.exports = { createUser, findByEmail, findById, getAllUsers };
