// utils/generateUserId.js

const mongoose = require('mongoose');
const User = mongoose.model('User'); // Assuming your User model is already set up

async function generateUniqueUserId() {
  let isUnique = false;
  let userId;

  // Keep generating until we find a unique userId
  while (!isUnique) {
    userId = Math.floor(1000000 + Math.random() * 9000000); // Generates a random 7-digit number

    // Check if a user already exists with this userId
    const existingUser = await User.findOne({ userId });

    if (!existingUser) {
      isUnique = true; // Break out of the loop if userId is unique
    }
  }

  return userId;
}

module.exports = generateUniqueUserId;
