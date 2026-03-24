import express from 'express';
import {
  createOrder,
  getMyOrders,
  getOrderById,
  getAllOrders,
  updateOrderStatus
} from '../controllers/orderController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', protect, createOrder);
router.get('/my-orders', protect, getMyOrders);
router.get('/admin', protect, adminOnly, getAllOrders);
router.patch('/admin/:id/status', protect, adminOnly, updateOrderStatus);
router.get('/:id', protect, getOrderById);

export default router;
