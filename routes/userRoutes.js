const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Route for registering a user
router.post('/register', userController.registerUser);

// Login route
router.post('/login', loginUser);

module.exports = router;
