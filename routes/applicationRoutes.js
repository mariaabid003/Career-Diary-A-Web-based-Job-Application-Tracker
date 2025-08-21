const express = require('express');
const router = express.Router();
const {
  createApplication,
  viewApplications,
  updateApplication,
  deleteApplication,
  searchApplications,
  filterApplications,
} = require('../controllers/applicationController');
const authenticate = require('../middleware/authMiddleware');

// Routes for job application workflow
router.post('/create', authenticate, createApplication);
router.get('/view', authenticate, viewApplications);
router.put('/update/:id', authenticate, updateApplication);
router.delete('/delete/:id', authenticate, deleteApplication);

// Routes for search and filter
router.get('/search', authenticate, searchApplications);
router.get('/filter', authenticate, filterApplications);

module.exports = router;
