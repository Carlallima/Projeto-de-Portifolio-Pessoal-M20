const express = require('express');
const router = express.Router();
const contractController = require('../controllers/contractController');
const authMiddleware = require('../middlewares/auth');

// Registrar contrato - usuário autenticado (consultor ou gestor). Consultor registra para si.
router.post('/', authMiddleware.authenticate, authMiddleware.authorize(['CONSULTOR','GESTOR']), contractController.register);

// Listar contratos - gestores veem todos, consultores só os seus
router.get('/', authMiddleware.authenticate, contractController.list);

module.exports = router;
