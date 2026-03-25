import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/User.js';

export const protect = asyncHandler(async (req, _res, next) => {
  const bearerToken = req.headers.authorization?.startsWith('Bearer')
    ? req.headers.authorization.split(' ')[1]
    : null;
  const token = bearerToken || req.cookies?.token;

  if (!token) {
    const error = new Error('Not authorized, token missing');
    error.statusCode = 401;
    throw error;
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  req.user = await User.findById(decoded.userId).select('-password');
  if (!req.user) {
    const error = new Error('User not found');
    error.statusCode = 401;
    throw error;
  }

  next();
});

export const adminOnly = (req, _res, next) => {
  if (req.user?.role !== 'admin') {
    const error = new Error('Admin access required');
    error.statusCode = 403;
    throw error;
  }
  next();
};
