const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');

const SECRET = process.env.JWT_SECRET || 'segredo_super_secreto';

function authenticate(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).json({ error: 'Token ausente' });
  const parts = auth.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') return res.status(401).json({ error: 'Token inválido' });
  const token = parts[1];
  try {
    const payload = jwt.verify(token, SECRET);
    const user = userModel.findById(payload.id);
    if (!user) return res.status(401).json({ error: 'Usuário não encontrado' });
    req.user = { id: user.id, role: user.role };
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Token inválido ou expirado' });
  }
}

function authorize(allowedRoles = []) {
  return (req, res, next) => {
    if (!req.user) return res.status(401).json({ error: 'Não autenticado' });
    if (allowedRoles.length === 0) return next();
    if (!allowedRoles.includes(req.user.role)) return res.status(403).json({ error: 'Acesso negado' });
    next();
  };
}

module.exports = { authenticate, authorize };
