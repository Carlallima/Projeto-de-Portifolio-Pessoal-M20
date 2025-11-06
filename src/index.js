// Ponto de entrada da aplicação
const app = require('./app');

const PORT = process.env.PORT || 3000;

if (require.main === module) {
  const server = app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });
  server.on('error', (err) => {
    console.error(err);
    process.exit(1);
  });
} else {
  module.exports = app;
}


