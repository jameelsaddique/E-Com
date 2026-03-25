import express from 'express';
import { body } from 'express-validator';
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  createReview
} from '../controllers/productController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';
import { validate } from '../middleware/validate.js';

const router = express.Router();

router.route('/').get(getProducts).post(
  protect,
  adminOnly,
  [body('name').notEmpty(), body('price').isFloat({ min: 0 }), body('image').notEmpty()],
  validate,
  createProduct
);

router.route('/:id').get(getProductById).put(protect, adminOnly, updateProduct).delete(protect, adminOnly, deleteProduct);
router.post('/:id/reviews', protect, [body('rating').isInt({ min: 1, max: 5 })], validate, createReview);

export default router;
