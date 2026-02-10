require('dotenv').config();
console.log("MONGO_URI is:", process.env.MONGO_URI); // <--- Add this line
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db'); // Import the file you just made

const app = express();

// Connect to Database
connectDB(); // Execute the connection

// Middleware
app.use(express.json());
app.use(cors());

// Basic Route
app.get('/', (req, res) => {
    res.json({ message: 'Smart Queue Backend is Running!' });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});