const Booking = require('../models/booking');
const Listing = require('../models/listing');
const ExpressError = require('../utils/ExpressError');

// Check if user is the booking owner
module.exports.isBookingOwner = async (req, res, next) => {
    const { id } = req.params;
    const booking = await Booking.findById(id);
    
    if (!booking) {
        throw new ExpressError(404, 'Booking not found');
    }
    
    if (!booking.user.equals(req.user._id)) {
        req.flash('error', 'You do not have permission to do that');
        return res.redirect(`/bookings/${id}`);
    }
    
    next();
};

// Check if user is the listing owner (host)
module.exports.isListingHost = async (req, res, next) => {
    const { id } = req.params;
    const booking = await Booking.findById(id).populate('listing');
    
    if (!booking) {
        throw new ExpressError(404, 'Booking not found');
    }
    
    if (!booking.listing.owner.equals(req.user._id)) {
        req.flash('error', 'Only the host can perform this action');
        return res.redirect(`/bookings/${id}`);
    }
    
    next();
};

// Validate booking dates
module.exports.validateBookingDates = (req, res, next) => {
    const { checkInDate, checkOutDate } = req.body;
    
    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);
    const now = new Date();
    
    if (isNaN(checkIn.getTime()) || isNaN(checkOut.getTime())) {
        throw new ExpressError(400, 'Invalid date format');
    }
    
    if (checkIn < now) {
        throw new ExpressError(400, 'Check-in date cannot be in the past');
    }
    
    if (checkOut <= checkIn) {
        throw new ExpressError(400, 'Check-out date must be after check-in date');
    }
    
    // Maximum booking duration (e.g., 90 days)
    const maxDuration = 90 * 24 * 60 * 60 * 1000; // 90 days in milliseconds
    if (checkOut - checkIn > maxDuration) {
        throw new ExpressError(400, 'Maximum booking duration is 90 days');
    }
    
    next();
};

// Check booking availability
module.exports.checkAvailability = async (req, res, next) => {
    const { listingId } = req.params;
    const { checkInDate, checkOutDate } = req.body;
    
    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);
    
    const isAvailable = await Booking.checkAvailability(listingId, checkIn, checkOut);
    
    if (!isAvailable) {
        throw new ExpressError(400, 'This listing is not available for the selected dates');
    }
    
    next();
};

// Validate guest count
module.exports.validateGuestCount = async (req, res, next) => {
    const { listingId } = req.params;
    const { guests } = req.body;
    
    const listing = await Listing.findById(listingId);
    
    if (!listing) {
        throw new ExpressError(404, 'Listing not found');
    }
    
    const guestCount = parseInt(guests);
    
    if (isNaN(guestCount) || guestCount < 1) {
        throw new ExpressError(400, 'Guest count must be at least 1');
    }
    
    if (listing.maxGuests && guestCount > listing.maxGuests) {
        throw new ExpressError(400, `Maximum ${listing.maxGuests} guests allowed for this listing`);
    }
    
    next();
};

module.exports.canCancelBooking = async (req, res, next) => {
    const { id } = req.params;
    const booking = await Booking.findById(id);
    
    if (!booking) {
        throw new ExpressError(404, 'Booking not found');
    }
    
    if (booking.bookingStatus === 'cancelled') {
        throw new ExpressError(400, 'Booking is already cancelled');
    }
    
    if (booking.bookingStatus === 'completed') {
        throw new ExpressError(400, 'Cannot cancel a completed booking');
    }
    
    // Check if check-in date has passed
    if (new Date() > booking.checkInDate) {
        throw new ExpressError(400, 'Cannot cancel a booking after check-in date');
    }
    
    next();
};
