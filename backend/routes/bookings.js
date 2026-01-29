const express = require('express');
const router = express.Router();
const bookingsController = require('../controllers/bookingsController');

// Create a booking
router.post('/', bookingsController.createBooking);

// Cancel a booking
router.post('/:id/cancel', bookingsController.cancelBooking);

// Get booking by id
router.get('/:id', bookingsController.getBookingById);

module.exports = router;
