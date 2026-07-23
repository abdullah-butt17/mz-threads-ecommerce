const mongoose = require('mongoose');

/**
 * Represents one main-category/sub-category pairing shown in the
 * shop's navigation and filters (e.g. mainCategory "Men", subCategory
 * "Kurta"). displayOrder lets the owner control menu ordering without
 * relying on alphabetical or creation-date sort.
 */
const categorySchema = new mongoose.Schema(
  {
    mainCategory: {
      type: String,
      required: [true, 'Main category is required'],
      trim: true,
    },
    subCategory: {
      type: String,
      required: [true, 'Sub category is required'],
      trim: true,
    },
    displayOrder: {
      type: Number,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

// A given main/sub category pairing should only exist once.
categorySchema.index({ mainCategory: 1, subCategory: 1 }, { unique: true });
categorySchema.index({ displayOrder: 1 });

module.exports = mongoose.model('Category', categorySchema);
