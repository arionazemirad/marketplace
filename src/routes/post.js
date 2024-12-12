const express = require('express');
const router = express.Router();
const authenticateUser = require('../middleware/userAuth'); // Middleware for user authentication
const postController = require('../controllers/postController'); // Controller handling post logic

// Create a new post
// The user must be authenticated to create a post
router.post('/', authenticateUser, postController.createPost);

// Get all posts
// This route will return all posts, but the user must be authenticated
router.get('/', authenticateUser, postController.getAllPosts);

// Get a single post by ID
// This route returns a specific post by its ID, but the user must be authenticated
router.get('/:id', authenticateUser, postController.getPostById);

// Update a post
// The authenticated user can update a specific post by its ID
router.put('/:id', authenticateUser, postController.updatePost);

// Delete a post
// The authenticated user can delete a specific post by its ID
router.delete('/:id', authenticateUser, postController.deletePost);

module.exports = router;
