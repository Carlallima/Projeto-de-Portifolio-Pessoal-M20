const userService = require('../services/userService');

function register(req, res, next) {
  try {
    const { name, email, password } = req.body;
    let { role } = req.body;
    if (!name || !email || !password) return res.status(400).json({ error: 'name, email e password são obrigatórios' });
    // Para simplificar os testes, assume CONSULTOR se role não for enviado
    if (!role) role = 'CONSULTOR';
    const user = userService.registerUser({ name, email, password, role });
    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
}

function list(req, res, next) {
  try {
    const users = userService.listUsers();
    res.json(users);
  } catch (err) {
    next(err);
  }
}

module.exports = { register, list };
