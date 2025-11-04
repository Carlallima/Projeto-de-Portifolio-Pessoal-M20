// Simula o envio de e-mail (substitui Nodemailer em modo de simulação)
function sendEmail({ to, subject, text }) {
  const payload = {
    to: to.email || to,
    toName: to.name || null,
    subject,
    message: text,
    sentAt: new Date().toISOString(),
  };
  // Simulação: log no console
  console.log('[Email simulated]', payload);
  return payload;
}

module.exports = { sendEmail };
