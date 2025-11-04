const emailModel = require('../models/emailModel');
const emailUtil = require('../utils/email');

function sendContractEmail(user, contract) {
  const subject = `Novo contrato registrado: ${contract.contractNumber}`;
  const message = `Olá ${user.name || ''},\n\nUm novo contrato foi registrado para você:\n- Contrato: ${contract.contractNumber}\n- Cliente: ${contract.clientName}\n- Processo: ${contract.processo || ''}\n- Edital: ${contract.editalCredenciamento || ''}\n- Código RAE: ${contract.codigoRAE || ''}\n\nAcesse o sistema para mais detalhes.`;

  // Simula envio via util
  emailUtil.sendEmail({ to: user, subject, text: message });

  // Registra no histórico em memória
  const record = emailModel.createEmail({ destinatario: user.email || user.id, assunto: subject, mensagem: message });
  return record;
}

function sendManualEmail({ destinatario, assunto, mensagem }) {
  // destinatario pode ser um e-mail string ou um objeto simples
  const to = typeof destinatario === 'string' ? { email: destinatario, name: destinatario } : destinatario;
  emailUtil.sendEmail({ to, subject: assunto, text: mensagem });
  return emailModel.createEmail({ destinatario: to.email, assunto, mensagem });
}

function listSent() {
  return emailModel.findAll();
}

module.exports = { sendContractEmail, sendManualEmail, listSent };
