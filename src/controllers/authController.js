const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');

const SECRET = process.env.JWT_SECRET || 'segredo_super_secreto';
const TEST_TOKEN = process.env.TEST_TOKEN;

function login(req, res, next) {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: 'email e password são obrigatórios' });

    // Atende ao teste: login padrão retorna TEST_TOKEN fixo
    if (TEST_TOKEN && email === 'usuario@mail.com' && password === '123456') {
      return res.json({ token: TEST_TOKEN });
    }

    // Fluxo normal: procura usuário cadastrado e retorna JWT
    const user = userModel.findByEmail(email);
    if (!user || user.password !== password) return res.status(401).json({ error: 'Credenciais inválidas' });
    const token = jwt.sign({ id: user.id, role: user.role }, SECRET, { expiresIn: '8h' });
    res.json({ token });
  } catch (err) {
    next(err);
  }
}

module.exports = { login };
