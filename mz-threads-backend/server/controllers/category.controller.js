const Category = require('../models/Category');
const ApiError = require('../utils/ApiError');
const asyncHandler = require('../utils/asyncHandler');

/**
 * @route   GET /api/categories
 * @access  Public
 * @desc    Returns all categories, sorted for direct use in shop nav/filters.
 *          Supports an optional ?activeOnly=true for the public storefront,
 *          while the admin dashboard can omit it to manage everything.
 */
const getCategories = asyncHandler(async (req, res) => {
  const filter = {};

  if (req.query.activeOnly === 'true') {
    filter.isActive = true;
  }

  if (req.query.mainCategory) {
    filter.mainCategory = req.query.mainCategory;
  }

  const categories = await Category.find(filter).sort({ displayOrder: 1, mainCategory: 1 });

  res.status(200).json({
    success: true,
    count: categories.length,
    data: categories,
  });
});

/**
 * @route   POST /api/categories
 * @access  Private (Admin)
 */
const createCategory = asyncHandler(async (req, res) => {
  const { mainCategory, subCategory, displayOrder, isActive } = req.body;

  const category = await Category.create({
    mainCategory,
    subCategory,
    displayOrder,
    isActive,
  });

  res.status(201).json({
    success: true,
    message: 'Category created successfully',
    data: category,
  });
});

/**
 * @route   PUT /api/categories/:id
 * @access  Private (Admin)
 */
const updateCategory = asyncHandler(async (req, res) => {
  const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!category) {
    throw new ApiError(404, 'Category not found');
  }

  res.status(200).json({
    success: true,
    message: 'Category updated successfully',
    data: category,
  });
});

/**
 * @route   DELETE /api/categories/:id
 * @access  Private (Admin)
 */
const deleteCategory = asyncHandler(async (req, res) => {
  const category = await Category.findByIdAndDelete(req.params.id);

  if (!category) {
    throw new ApiError(404, 'Category not found');
  }

  res.status(200).json({
    success: true,
    message: 'Category deleted successfully',
    data: {},
  });
});

module.exports = { getCategories, createCategory, updateCategory, deleteCategory };
