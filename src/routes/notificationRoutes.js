const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');
const authMiddleware = require('../middlewares/auth');

router.get('/', authMiddleware.authenticate, notificationController.list);

module.exports = router;
