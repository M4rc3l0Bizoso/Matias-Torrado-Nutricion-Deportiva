const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController'); // Verifica que el archivo exista y esté correctamente referenciado

// Ruta para registro
router.post('/register', authController.registerUser);

// Ruta para login
router.post('/login', authController.loginUser);

module.exports = router;

