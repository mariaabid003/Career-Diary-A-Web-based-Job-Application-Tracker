const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Define routes for user registration and login
router.post('/register', authController.register); // Route for registering
router.post('/login', authController.login);       // Route for logging in

module.exports = router;
