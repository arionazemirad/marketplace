const express = require('express');
const router = express.Router();
const {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} = require('../controllers/categoryController');

// Route to create a new category
router.post('/', createCategory);

// Route to get all categories
router.get('/', getAllCategories);

// Route to get a single category by ID
router.get('/:id', getCategoryById);

// Route to update a category
router.put('/:id', updateCategory);

// Route to delete a category
router.delete('/:id', deleteCategory);

module.exports = router;
