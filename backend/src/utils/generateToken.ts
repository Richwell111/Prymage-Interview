import jwt from 'jsonwebtoken';
import RefreshToken from '../models/RefreshToken.js';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey';

const generateTokens = async (user: any) => {
  const accessToken = jwt.sign(
    { id: user._id, email: user.email, username: user.username, role: user.role },
    JWT_SECRET,
    { expiresIn: '15m' }
  );

  const refreshTokenValue = jwt.sign(
    { id: user._id },
    JWT_SECRET,
    { expiresIn: '7d' }
  );

  // Store refresh token in DB
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 7);

  const refreshToken = new RefreshToken({
    token: refreshTokenValue,
    user: user._id,
    expiresAt
  });

  await refreshToken.save();

  return { accessToken, refreshToken: refreshTokenValue };
};

export default generateTokens;
