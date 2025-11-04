const express = require('express');
const yaml = require('yamljs');
const swaggerUi = require('swagger-ui-express');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const contractRoutes = require('./routes/contractRoutes');
const notificationRoutes = require('./routes/notificationRoutes');
const emailRoutes = require('./routes/emailRoutes');

const swaggerDocument = yaml.load('./resources/swagger.yaml');

const app = express();
app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Endpoint para baixar a documentação em formato JSON (para importar no Postman)
app.get('/swagger.json', (req, res) => {
  res.json(swaggerDocument);
});

app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/contracts', contractRoutes);
app.use('/notifications', notificationRoutes);
app.use('/emails', emailRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'API de Automação de Contratos - rode /api-docs para documentação' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;
