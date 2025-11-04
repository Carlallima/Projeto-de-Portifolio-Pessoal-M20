const emailService = require('../services/emailService');

function send(req, res, next) {
  try {
    if (!req.user) return res.status(401).json({ error: 'Não autenticado' });
    if (req.user.role !== 'GESTOR') return res.status(403).json({ error: 'Acesso negado' });

    const { destinatario, assunto, mensagem } = req.body;
    if (!destinatario || !assunto || !mensagem) return res.status(400).json({ error: 'destinatario, assunto e mensagem são obrigatórios' });

    const record = emailService.sendManualEmail({ destinatario, assunto, mensagem });
    res.status(201).json(record);
  } catch (err) {
    next(err);
  }
}

function list(req, res, next) {
  try {
    if (!req.user) return res.status(401).json({ error: 'Não autenticado' });
    if (req.user.role !== 'GESTOR') return res.status(403).json({ error: 'Acesso negado' });
    const list = emailService.listSent();
    res.json(list);
  } catch (err) {
    next(err);
  }
}

module.exports = { send, list };
