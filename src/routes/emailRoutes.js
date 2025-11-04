const express = require('express');
const router = express.Router();
const emailController = require('../controllers/emailController');
const authMiddleware = require('../middlewares/auth');

router.post('/send', authMiddleware.authenticate, emailController.send);
router.get('/', authMiddleware.authenticate, emailController.list);

module.exports = router;
