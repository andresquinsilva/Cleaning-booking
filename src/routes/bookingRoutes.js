import { Router } from 'express';
import { body } from 'express-validator';
import { protect, authorize } from '../middleware/auth.js';
import { createBooking, getMyBookings, getAllBookings, getBookingById, updateBooking, deleteBooking } from '../controllers/bookingController.js';

const router = Router();

// All routes below require authentication
router.use(protect);

// Create booking
router.post('/',
  body('address').notEmpty(),
  body('serviceType').isIn(['standard','deep','move-out','recurring']),
  body('date').notEmpty(),
  body('timeSlot').isIn(['8-10','10-12','12-2','2-4','4-6']),
  createBooking
);

// My bookings
router.get('/mine', getMyBookings);

// Admin: list all
router.get('/', authorize('admin'), getAllBookings);

// Single booking
router.get('/:id', getBookingById);
router.patch('/:id', updateBooking);
router.delete('/:id', deleteBooking);

export default router;
