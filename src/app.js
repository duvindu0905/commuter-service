const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const connectDB = require('./config/db');  // MongoDB connection for commuter service
const commuterRoutes = require('./routes/commuterRoute');  // Ensure this path is correct
const swaggerDocument = require('../swagger/swagger.json');  // Swagger documentation for commuter service

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // To parse JSON request bodies
app.use(bodyParser.urlencoded({ extended: true }));  // To parse form data (if needed)

// Connect to MongoDB using connectDB from db.js
connectDB();

// Serve Swagger API documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Use commuter routes for API endpoints under /commuter-service
app.use('/commuter-service', commuterRoutes);  // This ensures that all commuter routes are prefixed with /commuter-service

// Sample route
app.get('/', (req, res) => {
  res.send('Welcome to the Commuter Service API!');
});

// Fallback route for undefined paths
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);  // Log the error stack
  res.status(500).json({ message: 'Internal Server Error' });
});

module.exports = app;
