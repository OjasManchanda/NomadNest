/**
 * Refund Calculator Utility
 * Handles refund logic based on cancellation policies
 */

const ExpressError = require('./ExpressError');

/**
 * Calculate refund based on policy and timing
 */
function calculateRefundAmount(booking, cancellationDate = new Date()) {
    const { totalPrice, refundPolicy, checkInDate, paymentStatus, amountPaid } = booking;
    
    // Check if booking can be cancelled
    if (booking.bookingStatus === 'cancelled') {
        throw new ExpressError(400, 'Booking is already cancelled');
    }
    
    if (booking.bookingStatus === 'completed') {
        throw new ExpressError(400, 'Cannot cancel a completed booking');
    }
    
    // Check if payment was made
    if (paymentStatus === 'pending' || amountPaid === 0) {
        return {
            refundAmount: 0,
            refundPercentage: 0,
            message: 'No payment was made, no refund applicable'
        };
    }
    
    // Calculate days until check-in
    const daysUntilCheckIn = Math.ceil(
        (new Date(checkInDate) - cancellationDate) / (1000 * 60 * 60 * 24)
    );
    
    // If check-in date has passed
    if (daysUntilCheckIn < 0) {
        return {
            refundAmount: 0,
            refundPercentage: 0,
            daysUntilCheckIn,
            message: 'Check-in date has passed, no refund available'
        };
    }
    
    let refundPercentage = 0;
    let policyMessage = '';
    
    // Apply refund policy
    switch (refundPolicy) {
        case 'flexible':
            if (daysUntilCheckIn >= 1) {
                refundPercentage = 1.0; // 100%
                policyMessage = 'Full refund (cancelled 1+ days before check-in)';
            } else {
                refundPercentage = 0;
                policyMessage = 'No refund (cancelled less than 1 day before check-in)';
            }
            break;
            
        case 'moderate':
            if (daysUntilCheckIn >= 5) {
                refundPercentage = 0.5; // 50%
                policyMessage = '50% refund (cancelled 5+ days before check-in)';
            } else {
                refundPercentage = 0;
                policyMessage = 'No refund (cancelled less than 5 days before check-in)';
            }
            break;
            
        case 'strict':
            if (daysUntilCheckIn >= 7) {
                refundPercentage = 0.5; // 50%
                policyMessage = '50% refund (cancelled 7+ days before check-in)';
            } else {
                refundPercentage = 0;
                policyMessage = 'No refund (cancelled less than 7 days before check-in)';
            }
            break;
            
        default:
            throw new ExpressError(400, 'Invalid refund policy');
    }
    
    // Calculate refund amount based on amount paid
    const refundAmount = Math.round(amountPaid * refundPercentage * 100) / 100;
    
    return {
        refundAmount,
        refundPercentage: refundPercentage * 100, // Convert to percentage
        daysUntilCheckIn,
        policy: refundPolicy,
        message: policyMessage,
        originalAmount: totalPrice,
        amountPaid,
        cancellationDate: cancellationDate.toISOString()
    };
}

/**
 * Process refund for a booking
 */
async function processRefund(booking, cancellationReason = '') {
    const refundDetails = calculateRefundAmount(booking);
    
    // Update booking with cancellation details
    booking.bookingStatus = 'cancelled';
    booking.cancelledAt = new Date();
    booking.cancellationReason = cancellationReason;
    booking.refundAmount = refundDetails.refundAmount;
    
    // Update payment status
    if (refundDetails.refundAmount > 0) {
        booking.paymentStatus = 'refunded';
        booking.refundProcessed = true;
    }
    
    await booking.save();
    
    return {
        success: true,
        booking,
        refundDetails
    };
}

/**
 * Get refund policy details
 */
function getRefundPolicyDetails(policy) {
    const policies = {
        flexible: {
            name: 'Flexible',
            description: 'Full refund if cancelled 1+ day before check-in',
            rules: [
                { days: 1, refund: 100 },
                { days: 0, refund: 0 }
            ]
        },
        moderate: {
            name: 'Moderate',
            description: '50% refund if cancelled 5+ days before check-in',
            rules: [
                { days: 5, refund: 50 },
                { days: 0, refund: 0 }
            ]
        },
        strict: {
            name: 'Strict',
            description: '50% refund only if cancelled 7+ days before check-in',
            rules: [
                { days: 7, refund: 50 },
                { days: 0, refund: 0 }
            ]
        }
    };
    
    return policies[policy] || null;
}

module.exports = {
    calculateRefundAmount,
    processRefund,
    getRefundPolicyDetails
};
