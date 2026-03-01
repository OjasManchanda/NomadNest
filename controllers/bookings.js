const Booking = require('../models/booking');
const Listing = require('../models/listing');
const { calculateBookingPrice } = require('../utils/pricingCalculator');
const { processRefund, calculateRefundAmount } = require('../utils/refundCalculator');
const ExpressError = require('../utils/ExpressError');

// CREATE BOOKING
module.exports.createBooking = async (req, res) => {
    const { listingId } = req.params;
    const { checkInDate, checkOutDate, guests, insuranceAdded, specialRequests } = req.body;
    
    // Find listing
    const listing = await Listing.findById(listingId);
    if (!listing) {
        throw new ExpressError(404, 'Listing not found');
    }
    
    // Validate dates
    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);
    const now = new Date();
    
    if (checkIn < now) {
        throw new ExpressError(400, 'Check-in date cannot be in the past');
    }
    
    if (checkOut <= checkIn) {
        throw new ExpressError(400, 'Check-out date must be after check-in date');
    }
    
    // Check availability
    const isAvailable = await Booking.checkAvailability(listingId, checkIn, checkOut);
    if (!isAvailable) {
        throw new ExpressError(400, 'This listing is not available for the selected dates');
    }
    
    // Validate guest count
    if (listing.maxGuests && guests > listing.maxGuests) {
        throw new ExpressError(400, `Maximum ${listing.maxGuests} guests allowed`);
    }
    
    // Convert checkbox value to boolean (HTML checkboxes send "on" when checked)
    const hasInsurance = insuranceAdded === 'on' || insuranceAdded === true || insuranceAdded === 'true';
    
    // Calculate pricing
    const pricingDetails = calculateBookingPrice(
        listing.price,
        checkIn,
        checkOut,
        hasInsurance
    );
    
    // Determine booking type - always instant for now
    const bookingType = 'instant';
    const bookingStatus = 'confirmed';
    
    // Create booking
    const booking = new Booking({
        user: req.user._id,
        listing: listingId,
        checkInDate: checkIn,
        checkOutDate: checkOut,
        guests,
        numberOfNights: pricingDetails.numberOfNights,
        basePrice: pricingDetails.basePrice,
        weekendSurcharge: pricingDetails.weekendSurcharge,
        seasonalAdjustment: pricingDetails.seasonalAdjustment,
        discountAmount: pricingDetails.discountAmount,
        discountType: pricingDetails.discountType,
        totalPrice: pricingDetails.totalPrice,
        bookingType,
        bookingStatus,
        refundPolicy: listing.refundPolicy || 'moderate',
        insuranceAdded: hasInsurance,
        insuranceAmount: pricingDetails.insuranceAmount,
        specialRequests: specialRequests || '',
        remainingBalance: pricingDetails.totalPrice,
        // Auto-mark as paid for now (no payment gateway)
        paymentStatus: 'paid',
        amountPaid: pricingDetails.totalPrice
    });
    
    await booking.save();
    
    req.flash('success', 'Booking confirmed! Enjoy your stay.');
    res.redirect(`/bookings/${booking._id}`);
};

// SHOW BOOKING DETAILS
module.exports.showBooking = async (req, res) => {
    const { id } = req.params;
    
    const booking = await Booking.findById(id)
        .populate('user')
        .populate({
            path: 'listing',
            populate: { path: 'owner' }
        })
        .populate('splitPayments.user');
    
    if (!booking) {
        throw new ExpressError(404, 'Booking not found');
    }
    
    // Check authorization
    const isBookingUser = booking.user._id.equals(req.user._id);
    const isListingOwner = booking.listing.owner._id.equals(req.user._id);
    
    if (!isBookingUser && !isListingOwner) {
        throw new ExpressError(403, 'You do not have permission to view this booking');
    }
    
    res.render('bookings/show', { booking });
};

// GET ALL USER BOOKINGS
module.exports.getUserBookings = async (req, res) => {
    const bookings = await Booking.find({ user: req.user._id })
        .populate('listing')
        .sort({ createdAt: -1 });
    
    res.render('bookings/index', { bookings });
};

// GET ALL HOST BOOKINGS
module.exports.getHostBookings = async (req, res) => {
    const listings = await Listing.find({ owner: req.user._id }).select('_id');
    const listingIds = listings.map(l => l._id);
    
    const bookings = await Booking.find({ listing: { $in: listingIds } })
        .populate('user')
        .populate('listing')
        .sort({ createdAt: -1 });
    
    res.render('bookings/host-bookings', { bookings });
};

// APPROVE BOOKING REQUEST (Host only)
module.exports.approveBooking = async (req, res) => {
    const { id } = req.params;
    
    const booking = await Booking.findById(id).populate('listing');
    
    if (!booking) {
        throw new ExpressError(404, 'Booking not found');
    }
    
    // Check if user is the listing owner
    if (!booking.listing.owner.equals(req.user._id)) {
        throw new ExpressError(403, 'Only the host can approve bookings');
    }
    
    if (booking.bookingStatus !== 'pending') {
        throw new ExpressError(400, 'Only pending bookings can be approved');
    }
    
    // Check availability again
    const isAvailable = await Booking.checkAvailability(
        booking.listing._id,
        booking.checkInDate,
        booking.checkOutDate,
        booking._id
    );
    
    if (!isAvailable) {
        throw new ExpressError(400, 'Dates are no longer available');
    }
    
    booking.bookingStatus = 'confirmed';
    await booking.save();
    
    req.flash('success', 'Booking approved successfully!');
    res.redirect(`/bookings/${booking._id}`);
};

// REJECT BOOKING REQUEST (Host only)
module.exports.rejectBooking = async (req, res) => {
    const { id } = req.params;
    const { reason } = req.body;
    
    const booking = await Booking.findById(id).populate('listing');
    
    if (!booking) {
        throw new ExpressError(404, 'Booking not found');
    }
    
    // Check if user is the listing owner
    if (!booking.listing.owner.equals(req.user._id)) {
        throw new ExpressError(403, 'Only the host can reject bookings');
    }
    
    if (booking.bookingStatus !== 'pending') {
        throw new ExpressError(400, 'Only pending bookings can be rejected');
    }
    
    booking.bookingStatus = 'rejected';
    booking.cancellationReason = reason || 'Rejected by host';
    await booking.save();
    
    req.flash('success', 'Booking rejected');
    res.redirect('/bookings/host');
};

// CANCEL BOOKING
module.exports.cancelBooking = async (req, res) => {
    const { id } = req.params;
    const { reason } = req.body;
    
    const booking = await Booking.findById(id).populate('listing');
    
    if (!booking) {
        throw new ExpressError(404, 'Booking not found');
    }
    
    // Check if user is the booking owner
    if (!booking.user.equals(req.user._id)) {
        throw new ExpressError(403, 'You can only cancel your own bookings');
    }
    
    if (booking.bookingStatus === 'cancelled') {
        throw new ExpressError(400, 'Booking is already cancelled');
    }
    
    if (booking.bookingStatus === 'completed') {
        throw new ExpressError(400, 'Cannot cancel a completed booking');
    }
    
    // Process refund
    const result = await processRefund(booking, reason || 'Cancelled by guest');
    
    req.flash('success', `Booking cancelled. Refund amount: ₹${result.refundDetails.refundAmount}`);
    res.redirect(`/bookings/${booking._id}`);
};

// CALCULATE REFUND PREVIEW
module.exports.getRefundPreview = async (req, res) => {
    const { id } = req.params;
    
    const booking = await Booking.findById(id);
    
    if (!booking) {
        throw new ExpressError(404, 'Booking not found');
    }
    
    if (!booking.user.equals(req.user._id)) {
        throw new ExpressError(403, 'Unauthorized');
    }
    
    const refundDetails = calculateRefundAmount(booking);
    
    res.json({
        success: true,
        refundDetails
    });
};

// RECORD PAYMENT
module.exports.recordPayment = async (req, res) => {
    const { id } = req.params;
    const { amount, paymentMethod } = req.body;
    
    const booking = await Booking.findById(id);
    
    if (!booking) {
        throw new ExpressError(404, 'Booking not found');
    }
    
    if (!booking.user.equals(req.user._id)) {
        throw new ExpressError(403, 'Unauthorized');
    }
    
    const paymentAmount = parseFloat(amount);
    
    if (paymentAmount <= 0) {
        throw new ExpressError(400, 'Invalid payment amount');
    }
    
    if (booking.amountPaid + paymentAmount > booking.totalPrice) {
        throw new ExpressError(400, 'Payment amount exceeds remaining balance');
    }
    
    booking.amountPaid += paymentAmount;
    await booking.save();
    
    req.flash('success', `Payment of ₹${paymentAmount} recorded successfully`);
    res.redirect(`/bookings/${booking._id}`);
};

// RECORD SPLIT PAYMENT
module.exports.recordSplitPayment = async (req, res) => {
    const { id, splitPaymentId } = req.params;
    
    const booking = await Booking.findById(id);
    
    if (!booking) {
        throw new ExpressError(404, 'Booking not found');
    }
    
    const splitPayment = booking.splitPayments.id(splitPaymentId);
    
    if (!splitPayment) {
        throw new ExpressError(404, 'Split payment not found');
    }
    
    if (splitPayment.paid) {
        throw new ExpressError(400, 'This payment has already been recorded');
    }
    
    splitPayment.paid = true;
    splitPayment.paidAt = new Date();
    
    booking.amountPaid += splitPayment.amount;
    await booking.save();
    
    req.flash('success', 'Payment recorded successfully');
    res.redirect(`/bookings/${booking._id}`);
};

// GET BOOKING CALENDAR (for availability check)
module.exports.getBookingCalendar = async (req, res) => {
    const { listingId } = req.params;
    
    const bookings = await Booking.find({
        listing: listingId,
        bookingStatus: { $in: ['confirmed', 'pending'] }
    }).select('checkInDate checkOutDate bookingStatus');
    
    res.json({
        success: true,
        bookings
    });
};

module.exports.renderNewBookingForm = async (req, res) => {
    const { listingId } = req.params;
    const listing = await Listing.findById(listingId);
    
    if (!listing) {
        throw new ExpressError(404, 'Listing not found');
    }
    
    res.render('bookings/new', { listing });
};
