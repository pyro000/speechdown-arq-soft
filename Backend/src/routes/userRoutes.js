// src/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/userController');

// Definimos la ruta POST para '/register'
router.post('/register', registerUser);
router.post('/login', loginUser);

module.exports = router;