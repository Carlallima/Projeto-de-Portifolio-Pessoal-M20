const sentNotifications = [];

/**
 * sendWhatsApp - simula o envio de uma mensagem via WhatsApp para um usuário
 * user: objeto usuário (de userModel)
 */
function sendWhatsApp(user, message) {
  const timestamp = new Date().toISOString();
  const payload = {
    to: user.id,
    toName: user.name,
    phone: user.phone || 'SIMULATED_PHONE',
    message,
    sentAt: timestamp,
  };
  // Simulação: log e armazenamento em memória
  console.log('[WhatsApp simulated] ', payload);
  sentNotifications.push(payload);
  return payload;
}

function listSent() {
  return sentNotifications;
}

module.exports = { sendWhatsApp, listSent };
