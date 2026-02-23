const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); // We will install this next

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true, // No two users can have the same email
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false, // By default, a new user is NOT an admin
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt automatically
  }
);

// Method to check if entered password matches the hashed password in DB
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Middleware: Encrypt password BEFORE saving to database
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }
  // Generate a "salt" (random data) to mix with the password
  const salt = await bcrypt.genSalt(10);
  // Hash the password
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model('User', userSchema);

module.exports = User;