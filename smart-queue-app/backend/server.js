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
// ... existing code ...

// --- NEW ROUTE: Get Single Product ---
app.get('/api/products/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id); // Find by ID

        if (product) {
            res.json(product); // Send back the Apple
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});



// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});