import { type Request, type Response } from 'express';
import User from '../models/User.js';
import RefreshToken from '../models/RefreshToken.js';
import generateTokens from '../utils/generateToken.js';
import { registrationSchema, loginSchema } from '../utils/validation.js';
import logger from '../utils/logger.js';

export const registerUser = async (req: Request, res: Response) => {
  logger.info("Registration endpoint hit...");
  try {
    const result = registrationSchema.safeParse(req.body);
    if (!result.success) {
      logger.warn("Validation error", result.error.issues[0]?.message);
      return res.status(400).json({
        success: false,
        message: result.error.issues[0]?.message,
      });
    }

    const { email, password, username } = req.body;

    let user = await User.findOne({ $or: [{ email }, { username }] });
    if (user) {
      return res.status(400).json({ success: false, message: "User already exists" });
    }

    user = new User({ username, email, password });
    await user.save();
    
    // @ts-ignore
    const { accessToken, refreshToken } = await generateTokens(user);

    res.status(201).json({
      success: true,
      message: "User registered successfully!",
      accessToken,
      refreshToken,
    });
  } catch (e) {
    logger.error("Registration error occurred", e);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  logger.info("Login endpoint hit...");
  try {
    const result = loginSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: result.error.issues[0]?.message,
      });
    }

    const { email, password } = req.body;
    const user: any = await User.findOne({ email });

    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    const { accessToken, refreshToken } = await generateTokens(user);

    res.json({
      success: true,
      accessToken,
      refreshToken,
      userId: user._id,
      role: user.role
    });
  } catch (e) {
    logger.error("Login error occurred", e);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const logoutUser = async (req: Request, res: Response) => {
  try {
    const { refreshToken } = req.body;
    await RefreshToken.findOneAndDelete({ token: refreshToken });
    res.json({ success: true, message: "Logged out successfully!" });
  } catch (e) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find({}).select('-password');
    res.status(200).json(users);
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};
