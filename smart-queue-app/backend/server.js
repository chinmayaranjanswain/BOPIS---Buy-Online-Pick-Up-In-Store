// server.js
require('dotenv').config(); // Load environment variables
const express = require('express');
const cors = require('cors');

const app = express();

// Middleware
app.use(express.json()); // Allows us to parse JSON bodies
app.use(cors()); // Allows frontend to talk to backend

// Basic Route for Testing
app.get('/', (req, res) => {
    res.json({ message: 'Smart Queue Backend is Running!' });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});