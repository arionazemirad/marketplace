const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", ""); // Extract token from 'Authorization' header

  if (!token) {
    return res
      .status(403)
      .json({ message: "Access denied. No token provided." });
  }

  try {
    // Verify JWT token
    // eslint-disable-next-line no-undef
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // JWT_SECRET should be stored in .env
    req.user = decoded; // Attach the user data (userId, username) to the request
    next();
  } catch (err) {
    console.error(err);
    return res.status(403).json({ message: "Invalid token." });
  }
};

module.exports = authenticateToken;
