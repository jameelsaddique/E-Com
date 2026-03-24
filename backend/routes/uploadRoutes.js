import express from 'express';
import { uploadImage } from '../controllers/uploadController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';
import { upload } from '../config/multer.js';

const router = express.Router();

router.post('/', protect, adminOnly, upload.single('image'), uploadImage);

export default router;
