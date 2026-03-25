import asyncHandler from 'express-async-handler';
import User from '../models/User.js';
import { generateToken } from '../utils/generateToken.js';

const sendAuthResponse = (res, user, statusCode = 200) => {
  const token = generateToken(user._id, user.role);
  const isProd = process.env.NODE_ENV === 'production';

  res
    .status(statusCode)
    .cookie('token', token, {
      httpOnly: true,
      secure: process.env.COOKIE_SECURE === 'true' || isProd,
      sameSite: process.env.COOKIE_SAME_SITE || (isProd ? 'none' : 'lax'),
      maxAge: 7 * 24 * 60 * 60 * 1000
    })
    .json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token
    });
};

export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const exists = await User.findOne({ email });
  if (exists) {
    const error = new Error('Email already exists');
    error.statusCode = 409;
    throw error;
  }

  const user = await User.create({ name, email, password });
  sendAuthResponse(res, user, 201);
});

export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await user.matchPassword(password))) {
    const error = new Error('Invalid email or password');
    error.statusCode = 401;
    throw error;
  }

  sendAuthResponse(res, user);
});

export const logoutUser = asyncHandler(async (_req, res) => {
  res
    .clearCookie('token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax'
    })
    .json({ message: 'Logged out' });
});

export const getProfile = asyncHandler(async (req, res) => {
  res.json(req.user);
});
