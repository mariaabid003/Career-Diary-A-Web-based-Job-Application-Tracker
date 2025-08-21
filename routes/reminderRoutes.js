const express = require('express');
const router = express.Router();
const { setReminder } = require('../controllers/reminderController');
const authenticate = require('../middleware/authMiddleware');

// Route for setting reminders
router.post('/set', authenticate, setReminder);

module.exports = router;
