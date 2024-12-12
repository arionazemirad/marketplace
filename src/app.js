const express = require('express');
const connectDB = require('./config/db');
const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');
const categoryRoutes = require('./routes/category');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Create an Express app
const app = express();

// Middleware
app.use(express.json()); // Parse incoming JSON requests

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/categories', categoryRoutes);

app.get('/api', (req, res) => {
  // Send a response when the endpoint is accessed
  res.send('API is running');
});

// Start the server
// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
