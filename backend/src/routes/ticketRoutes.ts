import { Router } from 'express';
import { createTicket, getTickets, updateStatus, addNote } from '../controllers/ticketController.js';
import { protect, staffAndAdmin } from '../middleware/authMiddleware.js';
import { apiLimiter } from '../middleware/rateLimiter.js';

const router = Router();

// Public: Create Ticket
router.post('/', apiLimiter, createTicket);

// Protected: Staff & Admin only
router.get('/', apiLimiter, protect, staffAndAdmin, getTickets);
router.patch('/:id/status', apiLimiter, protect, staffAndAdmin, updateStatus);
router.post('/:id/notes', apiLimiter, protect, staffAndAdmin, addNote);

export default router;
