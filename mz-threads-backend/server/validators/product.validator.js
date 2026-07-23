const { body, param } = require('express-validator');

const STOCK_STATUSES = ['in_stock', 'out_of_stock', 'limited'];

const createProductValidator = [
  body('name').trim().notEmpty().withMessage('Product name is required'),
  body('mainCategory').trim().notEmpty().withMessage('Main category is required'),
  body('subCategory').trim().notEmpty().withMessage('Sub category is required'),
  body('collection').optional().trim(),
  body('description').trim().notEmpty().withMessage('Description is required'),
  body('material').optional().trim(),
  body('availableSizes').optional().isArray().withMessage('Available sizes must be an array'),
  body('availableColors').optional().isArray().withMessage('Available colors must be an array'),
  body('price').isFloat({ min: 0 }).withMessage('Price must be a positive number'),
  body('salePrice')
    .optional({ nullable: true })
    .isFloat({ min: 0 })
    .withMessage('Sale price must be a positive number'),
  body('stockStatus')
    .optional()
    .isIn(STOCK_STATUSES)
    .withMessage(`Stock status must be one of: ${STOCK_STATUSES.join(', ')}`),
  body('featured').optional().isBoolean().withMessage('Featured must be true or false'),
  body('images')
    .optional()
    .isArray({ min: 1 })
    .withMessage('At least one image is required'),
];

const updateProductValidator = [
  param('id').notEmpty().withMessage('Product id is required'),
  body('name').optional().trim().notEmpty().withMessage('Product name cannot be empty'),
  body('mainCategory').optional().trim().notEmpty().withMessage('Main category cannot be empty'),
  body('subCategory').optional().trim().notEmpty().withMessage('Sub category cannot be empty'),
  body('collection').optional().trim(),
  body('description').optional().trim().notEmpty().withMessage('Description cannot be empty'),
  body('material').optional().trim(),
  body('availableSizes').optional().isArray().withMessage('Available sizes must be an array'),
  body('availableColors').optional().isArray().withMessage('Available colors must be an array'),
  body('price').optional().isFloat({ min: 0 }).withMessage('Price must be a positive number'),
  body('salePrice')
    .optional({ nullable: true })
    .isFloat({ min: 0 })
    .withMessage('Sale price must be a positive number'),
  body('stockStatus')
    .optional()
    .isIn(STOCK_STATUSES)
    .withMessage(`Stock status must be one of: ${STOCK_STATUSES.join(', ')}`),
  body('featured').optional().isBoolean().withMessage('Featured must be true or false'),
];

module.exports = { createProductValidator, updateProductValidator };
