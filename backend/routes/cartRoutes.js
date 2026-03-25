import express from 'express';
import { getCart, addToCart, removeCartItem } from '../controllers/cartController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect);
router.get('/', getCart);
router.post('/', addToCart);
router.delete('/:productId', removeCartItem);

export default router;
