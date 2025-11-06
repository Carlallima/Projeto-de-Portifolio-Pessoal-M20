const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/auth');

// Registro público de usuários
router.post('/', userController.register);

// Listagem de usuários (requer autenticação; aceita token fixo de teste)
router.get('/', authMiddleware.authenticate, userController.list);

module.exports = router;