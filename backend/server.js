const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());
// Connect to MongoDB
mongoose
  .connect(process.env.DB_URI)
  .then(() => console.log('DB Connection Successful'));

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Import controllers
const authController = require('./Controllers/authController');
const employeeController = require('./Controllers/employeeController');

// Register admin
app.post('/register', authController.register);

// Login admin
app.post('/login', authController.login);
app.post('/logout', authController.logout);

// CRUD operations for Employee
app
  .route('/employees')
  .get(authController.protect, employeeController.getAllEmployees)
  .post(authController.protect, employeeController.createEmployee);
app
  .route('/employees/:id')
  .get(authController.protect, employeeController.getEmployeeById)
  .put(authController.protect, employeeController.updateEmployee)
  .delete(authController.protect, employeeController.deleteEmployee);

const PORT = process.env.PORT || 8001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
