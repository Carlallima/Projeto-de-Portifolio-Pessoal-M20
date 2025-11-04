const notificationService = require('../services/notificationService');

function list(req, res, next) {
  try {
    // Apenas gestores podem ver todas as notificações
    if (!req.user) return res.status(401).json({ error: 'Não autenticado' });
    if (req.user.role !== 'GESTOR') return res.status(403).json({ error: 'Acesso negado' });
    const list = notificationService.listSent();
    res.json(list);
  } catch (err) {
    next(err);
  }
}

module.exports = { list };
