const mongoose = require('mongoose');
const slugify = require('../utils/slugify');

const imageSchema = new mongoose.Schema(
  {
    url: { type: String, required: true },
    publicId: { type: String, required: true }, // Cloudinary public_id, needed to delete/replace later
  },
  { _id: false }
);

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Product name is required'],
      trim: true,
    },
    slug: {
      type: String,
      unique: true,
      index: true,
    },
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
    collection: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
    },
    material: {
      type: String,
      trim: true,
    },
    availableSizes: {
      type: [String],
      default: [],
    },
    availableColors: {
      type: [String],
      default: [],
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: [0, 'Price cannot be negative'],
    },
    salePrice: {
      type: Number,
      min: [0, 'Sale price cannot be negative'],
      validate: {
        validator: function validateSalePrice(value) {
          // Allow null/undefined (no sale), but if set, it must be < price.
          return value == null || value < this.price;
        },
        message: 'Sale price must be less than the regular price',
      },
    },
    stockStatus: {
      type: String,
      enum: ['in_stock', 'out_of_stock', 'limited'],
      default: 'in_stock',
    },
    featured: {
      type: Boolean,
      default: false,
    },
    images: {
      type: [imageSchema],
      default: [],
      validate: {
        validator: (arr) => arr.length > 0,
        message: 'At least one product image is required',
      },
    },
  },
  {
    timestamps: true,
    // 'collection' is a Mongoose-reserved schema pathname (used internally
    // by Model, not Document instances). Verified this field works
    // correctly as a plain string; this option just silences the warning.
    suppressReservedKeysWarning: true,
  }
);

// Auto-generate (and de-duplicate) the slug from the product name whenever
// the name changes, so the frontend always has a clean, stable URL segment.
productSchema.pre('validate', async function generateSlug(next) {
  if (!this.isModified('name') && this.slug) return next();

  const base = slugify(this.name);
  let candidate = base;
  let suffix = 1;

  // Ensure uniqueness even if two products share a name
  // (e.g. "Emerald Silk Kurta" listed in two colorways).
  const Product = this.constructor;
  while (await Product.exists({ slug: candidate, _id: { $ne: this._id } })) {
    suffix += 1;
    candidate = `${base}-${suffix}`;
  }

  this.slug = candidate;
  next();
});

// Text index powers the search feature (?search=silk kurta).
productSchema.index({ name: 'text', description: 'text', material: 'text' });
// Common filter/sort combinations.
productSchema.index({ mainCategory: 1, subCategory: 1 });
productSchema.index({ featured: 1 });
productSchema.index({ price: 1 });
productSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Product', productSchema);
