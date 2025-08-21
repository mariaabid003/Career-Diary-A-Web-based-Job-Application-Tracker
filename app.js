const express = require('express');
const dotenv = require('dotenv');
const sequelize = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const applicationRoutes = require('./routes/applicationRoutes');

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes); // Authentication routes (login, register)
app.use('/api/applications', applicationRoutes); // Job application routes

// Start the server
sequelize.sync()
  .then(() => {
    console.log('Database connected');
    const port = process.env.PORT || 3000; // Use PORT from .env or default to 3000
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch(err => {
    console.error('Failed to connect to database:', err);
  });
