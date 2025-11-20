const cors = require('cors');
const express = require('express');
const dotenv = require('dotenv');
// Check if your folder is uppercase 'Config'
// This is the CORRECT path for a file in the same directory
const connectDB = require('./db.js');
const studentRoutes = require('./studentRoutes.js'); // Import Mongoose routes 

// Load environment variables from .env file
dotenv.config();

// Connect to database
connectDB(); 

const app = express();
// Default to 5000 if not specified in .env
const PORT = process.env.PORT || 3000;

// --- Middleware ---
app.use(cors());
app.use(express.json()); 

// --- Routes Middleware ---
// All requests to /api/students will be handled by studentRoutes
app.use('/api/students', studentRoutes); 

// --- Global Error Handling Middleware (MUST be the last middleware) ---
app.use((err, req, res, next) => {
    // Log the error stack for debugging
    console.error(err.stack); 

    let statusCode = res.statusCode === 200 ? 500 : res.statusCode || 500;
    let message = err.message || 'Server Error';

    // 1. Handle Mongoose Validation Errors (400 Bad Request)
    if (err.name === 'ValidationError') {
        statusCode = 400;
        // Concatenate all validation error messages
        message = 'Validation failed: ' + Object.values(err.errors).map(val => val.message).join(', ');
    } 
    // 2. Handle Mongoose Duplicate Key Error (11000 - 409 Conflict)
    else if (err.code && err.code === 11000) {
        statusCode = 409;
        const field = Object.keys(err.keyValue).join(', ');
        message = `Duplicate value for ${field}. This must be unique.`;
    }
    // 3. Handle Invalid Mongoose ID Format (CastError - 404 Not Found)
    else if (err.name === 'CastError') {
        statusCode = 404;
        message = 'Resource not found or invalid ID format.';
    }

    res.status(statusCode).json({
        success: false,
        message: message,
    });
});


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    // This confirms the server started, but does not confirm DB connection (connectDB does that)
});