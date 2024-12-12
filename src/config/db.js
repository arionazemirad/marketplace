/* eslint-disable no-undef */
const mongoose = require('mongoose');
require('dotenv').config(); // Load .env variables

const connectDB = async () => {
  try {
    const dbURI = process.env.MONGO_URI; // MongoDB URI from .env
    await mongoose.connect(dbURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected successfully');
  } catch (err) {
    console.error('Error connecting to MongoDB:', err.message);
    process.exit(1); // Exit the process if MongoDB connection fails
  }
};

module.exports = connectDB;
