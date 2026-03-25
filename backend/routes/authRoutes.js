import express from 'express';
import { body } from 'express-validator';
import { registerUser, loginUser, logoutUser, getProfile } from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';
import { validate } from '../middleware/validate.js';

const router = express.Router();

router.post(
  '/register',
  [body('name').notEmpty(), body('email').isEmail(), body('password').isLength({ min: 6 })],
  validate,
  registerUser
);

router.post('/login', [body('email').isEmail(), body('password').notEmpty()], validate, loginUser);
router.post('/logout', logoutUser);
router.get('/profile', protect, getProfile);

export default router;
