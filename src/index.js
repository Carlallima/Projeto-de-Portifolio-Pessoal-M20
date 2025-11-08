// Ponto de entrada da aplicação
require('dotenv').config();
const app = require('./app');

const PORT = process.env.PORT || 3000;

// Só inicia o servidor se este arquivo for executado diretamente (npm start)
// Quando importado (testes Mocha, K6, etc), apenas exporta o app sem dar listen
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
    console.log(`📚 Swagger: http://localhost:${PORT}/api-docs`);
  }).on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.error(`❌ Porta ${PORT} já está em uso!`);
      console.error(`Execute: taskkill /F /IM node.exe`);
      process.exit(1);
    }
    throw err;
  });
}

// Exporta o app para ser usado por testes e K6
module.exports = app;


