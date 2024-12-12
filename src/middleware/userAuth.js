const jwt = require('jsonwebtoken');
const User = require('../models/userModel'); // User model

const authenticateUser = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', ''); // Extract token from header
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Decode the token

    // Check if the token exists in the database for the user
    const user = await User.findOne({ _id: decoded.userId, token: token }); // Match token with user's stored token
    if (!user) {
      return res.status(401).json({ message: 'Authentication failed' });
    }

    // Attach user object to the request
    req.user = user;

    // Proceed to next middleware or route handler
    next();
  } catch (error) {
    res.status(401).json({ message: 'Authentication failed', error: error.message });
  }
};

module.exports = authenticateUser;
