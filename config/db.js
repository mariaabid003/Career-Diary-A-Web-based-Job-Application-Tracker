require('dotenv').config();  // Load environment variables

const { Sequelize } = require('sequelize');

// Creating a new Sequelize instance using environment variables
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: 'localhost',  // Using 'localhost' for local MySQL server
  port: 3306,         // Default MySQL port
  dialect: 'mysql'    // Database dialect is 'mysql'
});

// Test the connection
sequelize.authenticate()
  .then(() => console.log('Database connected successfully.'))
  .catch(err => console.error('Error connecting to the database:', err));

module.exports = sequelize;
