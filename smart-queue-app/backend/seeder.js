const mongoose = require('mongoose');
const dotenv = require('dotenv');

const products = require('./data/products');
const Product = require('./models/Product');
const connectDB = require('./config/db');

dotenv.config();

connectDB();

const importData = async () => {
  try {
    // 1. Clear existing data so we don't have duplicates
    await Product.deleteMany();

    // 2. Insert the new products
    await Product.insertMany(products);

    console.log('Data Imported Success!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Product.deleteMany();
    console.log('Data Destroyed!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}