// Configuração do Express
const express = require('express');
const cors = require('cors'); // caso queira usar CORS
const path = require('path');
const YAML = require('yamljs');
const swaggerUi = require('swagger-ui-express');
require('dotenv').config();   // carregar variáveis de ambiente

const app = express();

// Middlewares globais
app.use(cors());
app.use(express.json());

// Swagger UI (/api-docs) e JSON (/swagger.json)
try {
  const swaggerDocument = YAML.load(path.join(__dirname, '../resources/swagger.yaml'));
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  app.get('/swagger.json', (req, res) => res.json(swaggerDocument));
} catch (e) {
  console.warn('Swagger não carregado:', e && e.message);
}

// Rotas (todas com prefixo /api para alinhar com os testes)
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const contractRoutes = require('./routes/contractRoutes');
const emailRoutes = require('./routes/emailRoutes');
const notificationRoutes = require('./routes/notificationRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/contracts', contractRoutes);
app.use('/api/emails', emailRoutes);
app.use('/api/notifications', notificationRoutes);

// Rota de teste/saúde
app.get('/', (req, res) => {
  res.json({ ok: true, message: 'API funcionando!' });
});

module.exports = app;


