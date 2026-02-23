const mongoose = require('mongoose');
const dotenv = require('dotenv');
const users = require('./data/users'); // <--- Import Users
const products = require('./data/products');
const User = require('./models/userModel'); // <--- Import User Model
const Product = require('./models/Product');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const importData = async () => {
  try {
    // 1. Clear everything first
    await Product.deleteMany();
    await User.deleteMany();

    // 2. Insert Users
    // We use a loop with .create() so the encryption rule runs for EACH user
    const createdUsers = [];
    for (const user of users) {
      const newUser = await User.create(user);
      createdUsers.push(newUser);
    }

    // 3. Get the Admin User's ID (to make them the "owner" of the products)
    const adminUser = createdUsers[0]._id;

    // 4. Add the Admin ID to every product
    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser };
    });

    // 5. Insert Products
    await Product.insertMany(sampleProducts);

    console.log('Data Imported!');
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Product.deleteMany();
    await User.deleteMany();

    console.log('Data Destroyed!');
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}