const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Rutas de usuarios
router.get('/', userController.getUsers);
router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/profile', userController.getProfile);

module.exports = router;