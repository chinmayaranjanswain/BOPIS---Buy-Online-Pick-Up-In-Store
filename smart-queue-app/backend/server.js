require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const Product = require('./models/Product');

const app = express();

// Connect to Database
connectDB();

// Middleware
app.use(express.json());
app.use(cors());

// --- ROUTE 1: Home Page ---
app.get('/', (req, res) => {
    res.json({ message: 'Smart Queue Backend is Running!' });
});

// --- ROUTE 2: Get All Products (The one that was missing) ---
app.get('/api/products', async (req, res) => {
    try {
        const products = await Product.find({}); // Go to DB, get all items
        res.json(products); // Send them to the browser
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});