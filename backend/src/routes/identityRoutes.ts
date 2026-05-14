import { Router } from 'express';
import { registerUser, loginUser, logoutUser, getUsers } from '../controllers/identityController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';
import { loginLimiter } from '../middleware/rateLimiter.js';

const router = Router();

router.post('/register', registerUser);
router.post('/login', loginLimiter, loginUser);
router.post('/logout', logoutUser);

// Admin only: List all users/staff
router.get('/users', protect, adminOnly, getUsers);

export default router;
