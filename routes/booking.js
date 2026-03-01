const express = require('express');
const router = express.Router();
const wrapAsync = require('../utils/wrapAsync');
const { isLoggedIn } = require('../middleware');
const bookingController = require('../controllers/bookings');

// USER'S BOOKINGS - Must come before :id route
router.get('/bookings', isLoggedIn, wrapAsync(bookingController.getUserBookings));

// HOST'S BOOKINGS
router.get('/bookings/host', isLoggedIn, wrapAsync(bookingController.getHostBookings));

// SHOW BOOKING DETAILS
router.get('/bookings/:id', isLoggedIn, wrapAsync(bookingController.showBooking));

// APPROVE BOOKING (Host)
router.post('/bookings/:id/approve', isLoggedIn, wrapAsync(bookingController.approveBooking));

// REJECT BOOKING (Host)
router.post('/bookings/:id/reject', isLoggedIn, wrapAsync(bookingController.rejectBooking));

// CANCEL BOOKING (Guest)
router.post('/bookings/:id/cancel', isLoggedIn, wrapAsync(bookingController.cancelBooking));

// GET REFUND PREVIEW
router.get('/bookings/:id/refund-preview', isLoggedIn, wrapAsync(bookingController.getRefundPreview));

// RECORD PAYMENT
router.post('/bookings/:id/payment', isLoggedIn, wrapAsync(bookingController.recordPayment));

// RECORD SPLIT PAYMENT
router.post('/bookings/:id/split-payment/:splitPaymentId', isLoggedIn, wrapAsync(bookingController.recordSplitPayment));

// CREATE BOOKING - This creates the booking and redirects to /bookings/:id
router.post('/listings/:listingId/bookings', isLoggedIn, wrapAsync(bookingController.createBooking));

// GET BOOKING CALENDAR (for availability)
router.get('/listings/:listingId/calendar', wrapAsync(bookingController.getBookingCalendar));

module.exports = router;
