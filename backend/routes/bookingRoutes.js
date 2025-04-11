import express from 'express';
import { createBooking, getBooking, getAllBooking } from '../controllers/bookingController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', protect, createBooking);
router.get('/:id', protect, getBooking);
router.get('/', protect, getAllBooking);

export default router; 