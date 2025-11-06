const jwt = require('jsonwebtoken');

const SECRET = process.env.JWT_SECRET || 'segredo_super_secreto';
const TEST_TOKEN = process.env.TEST_TOKEN; // token fixo para cenários de teste

function authenticate(req, res, next) {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  if (!authHeader) return res.status(401).json({ error: 'Token ausente' });

  // Aceita cabeçalhos nas formas: "Bearer <token>" OU apenas "<token>"
  let scheme;
  let token;
  const parts = authHeader.split(' ');
  if (parts.length === 2) {
    scheme = parts[0];
    token = parts[1];
  } else {
    token = authHeader;
  }

  // Se for o token fixo de teste, autentica como GESTOR em modo de teste
  const bearerHeader = `Bearer ${token}`;
  if (
    TEST_TOKEN && (
      token === TEST_TOKEN ||
      authHeader === TEST_TOKEN ||
      bearerHeader === TEST_TOKEN
    )
  ) {
    req.user = { id: 'test-gestor', role: 'GESTOR', testMode: true };
    return next();
  }

  // Caso contrário, exige Bearer <JWT>
  if (scheme !== 'Bearer' || !token) {
    return res.status(401).json({ error: 'Formato de token inválido' });
  }

  try {
    const payload = jwt.verify(token, SECRET);
    // payload deve ter { id, role }
    req.user = { id: payload.id, role: payload.role };
    return next();
  } catch (err) {
    return res.status(401).json({ error: 'Token inválido' });
  }
}

function authorize(allowedRoles = []) {
  return (req, res, next) => {
    if (!req.user) return res.status(401).json({ error: 'Não autenticado' });
    if (!Array.isArray(allowedRoles) || allowedRoles.length === 0) return next();
    if (allowedRoles.includes(req.user.role)) return next();
    return res.status(403).json({ error: 'Acesso negado' });
  };
}

module.exports = { authenticate, authorize };

