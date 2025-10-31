const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/auth');

// registro público de usuários (Gestor ou Consultor)
router.post('/', userController.register);

// listar usuários - apenas gestores
router.get('/', authMiddleware.authenticate, authMiddleware.authorize(['GESTOR']), userController.list);

module.exports = router;
