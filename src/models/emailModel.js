const { v4: uuidv4 } = require('uuid');

const sentEmails = [];

function createEmail({ destinatario, assunto, mensagem }) {
  const e = {
    id: uuidv4(),
    destinatario,
    assunto,
    mensagem,
    dataEnvio: new Date().toISOString(),
  };
  sentEmails.push(e);
  return e;
}

function findAll() {
  return sentEmails;
}

module.exports = { createEmail, findAll };
