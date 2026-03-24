import asyncHandler from 'express-async-handler';
import Product from '../models/Product.js';

export const getProducts = asyncHandler(async (req, res) => {
  const { keyword = '', category = '', page = 1, limit = 12 } = req.query;
  const filter = {
    name: { $regex: keyword, $options: 'i' },
    ...(category ? { category } : {})
  };

  const skip = (Number(page) - 1) * Number(limit);
  const [products, total] = await Promise.all([
    Product.find(filter).sort('-createdAt').skip(skip).limit(Number(limit)),
    Product.countDocuments(filter)
  ]);

  res.json({ products, total, page: Number(page), pages: Math.ceil(total / limit) });
});

export const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    const error = new Error('Product not found');
    error.statusCode = 404;
    throw error;
  }
  res.json(product);
});

export const createProduct = asyncHandler(async (req, res) => {
  const created = await Product.create(req.body);
  res.status(201).json(created);
});

export const updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    const error = new Error('Product not found');
    error.statusCode = 404;
    throw error;
  }

  Object.assign(product, req.body);
  const updated = await product.save();
  res.json(updated);
});

export const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    const error = new Error('Product not found');
    error.statusCode = 404;
    throw error;
  }

  await product.deleteOne();
  res.json({ message: 'Product removed' });
});

export const createReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;
  const product = await Product.findById(req.params.id);

  if (!product) {
    const error = new Error('Product not found');
    error.statusCode = 404;
    throw error;
  }

  const alreadyReviewed = product.reviews.find(
    (review) => review.user.toString() === req.user._id.toString()
  );
  if (alreadyReviewed) {
    const error = new Error('Product already reviewed');
    error.statusCode = 400;
    throw error;
  }

  product.reviews.push({
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment
  });

  product.numReviews = product.reviews.length;
  product.rating =
    product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length;

  await product.save();
  res.status(201).json({ message: 'Review added' });
});
