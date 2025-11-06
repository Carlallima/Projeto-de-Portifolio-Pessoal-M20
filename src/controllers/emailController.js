const emailService = require('../services/emailService');

function send(req, res, next) {
  try {
    if (!req.user) return res.status(401).json({ error: 'Não autenticado' });

    // Aceita tanto (destinatario, assunto, mensagem) quanto (to, subject, body)
    const destinatario = req.body.destinatario || req.body.to;
    const assunto = req.body.assunto || req.body.subject;
    const mensagem = req.body.mensagem || req.body.body;
    if (!destinatario || !assunto || !mensagem) return res.status(400).json({ error: 'Parâmetros obrigatórios ausentes' });

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
