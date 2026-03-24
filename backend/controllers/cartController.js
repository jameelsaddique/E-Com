import asyncHandler from 'express-async-handler';
import Cart from '../models/Cart.js';

export const getCart = asyncHandler(async (req, res) => {
  const cart = await Cart.findOne({ user: req.user._id }).populate('items.product');
  res.json(cart || { user: req.user._id, items: [] });
});

export const addToCart = asyncHandler(async (req, res) => {
  const { productId, quantity = 1 } = req.body;
  let cart = await Cart.findOne({ user: req.user._id });

  if (!cart) cart = await Cart.create({ user: req.user._id, items: [] });

  const existing = cart.items.find((item) => item.product.toString() === productId);
  if (existing) {
    existing.quantity = quantity;
  } else {
    cart.items.push({ product: productId, quantity });
  }

  await cart.save();
  const populated = await cart.populate('items.product');
  res.status(200).json(populated);
});

export const removeCartItem = asyncHandler(async (req, res) => {
  const cart = await Cart.findOne({ user: req.user._id });
  if (!cart) return res.json({ user: req.user._id, items: [] });

  cart.items = cart.items.filter((item) => item.product.toString() !== req.params.productId);
  await cart.save();
  const populated = await cart.populate('items.product');
  res.json(populated);
});
