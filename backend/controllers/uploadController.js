import asyncHandler from 'express-async-handler';

export const uploadImage = asyncHandler(async (req, res) => {
  if (!req.file) {
    const error = new Error('Image file is required');
    error.statusCode = 400;
    throw error;
  }

  res.status(201).json({
    message: 'Image uploaded',
    imageUrl: `/uploads/${req.file.filename}`
  });
});
