const Post = require('../models/postModel');

// Create a new post
exports.createPost = async (req, res) => {
  try {
    const { title, description, price, location, images, category } = req.body;

    // Ensure the required fields are present in the request body
    if (!title || !description || !price || !location) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Create a new post
    const newPost = new Post({
      title,
      description,
      price,
      location,
      images,
      category,
      user: req.user._id, // Set the user from the authenticated user
    });

    // Save the new post
    await newPost.save();

    res.status(201).json({
      message: 'Post created successfully',
      post: newPost,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all posts
exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate('user', 'firstName lastName email') // Populate user details (select only required fields)
      .exec();

    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get a single post by ID
exports.getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate('category', 'name')
      .populate('user', 'username email');

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Increment views for the post
    await post.incrementViews();

    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching post', error: error.message });
  }
};

// Update a post
exports.updatePost = async (req, res) => {
  try {
    const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true, // Return the updated document
      runValidators: true, // Ensure validations are applied
    });

    if (!updatedPost) {
      return res.status(404).json({ message: 'Post not found' });
    }

    res.status(200).json({ message: 'Post updated successfully', updatedPost });
  } catch (error) {
    res.status(500).json({ message: 'Error updating post', error: error.message });
  }
};

// Delete a post
exports.deletePost = async (req, res) => {
  try {
    const deletedPost = await Post.findByIdAndDelete(req.params.id);

    if (!deletedPost) {
      return res.status(404).json({ message: 'Post not found' });
    }

    res.status(200).json({ message: 'Post deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting post', error: error.message });
  }
};
