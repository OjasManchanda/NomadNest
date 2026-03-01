const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookingSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    listing: {
        type: Schema.Types.ObjectId,
        ref: 'Listing',
        required: true
    },
    checkInDate: {
        type: Date,
        required: true
    },
    checkOutDate: {
        type: Date,
        required: true
    },
    guests: {
        type: Number,
        required: true,
        min: 1
    },
    numberOfNights: {
        type: Number,
        required: true
    },
    basePrice: {
        type: Number,
        required: true
    },
    weekendSurcharge: {
        type: Number,
        default: 0
    },
    seasonalAdjustment: {
        type: Number,
        default: 0
    },
    discountAmount: {
        type: Number,
        default: 0
    },
    discountType: {
        type: String,
        enum: ['none', 'last-minute', 'early-bird', 'long-term', 'combined'],
        default: 'none'
    },
    totalPrice: {
        type: Number,
        required: true
    },
    bookingType: {
        type: String,
        enum: ['instant', 'request'],
        required: true
    },
    bookingStatus: {
        type: String,
        enum: ['pending', 'confirmed', 'cancelled', 'completed', 'rejected'],
        default: 'pending'
    },
    paymentStatus: {
        type: String,
        enum: ['pending', 'partial', 'paid', 'refunded'],
        default: 'pending'
    },
    refundPolicy: {
        type: String,
        enum: ['flexible', 'moderate', 'strict'],
        required: true
    },
    insuranceAdded: {
        type: Boolean,
        default: false
    },
    insuranceAmount: {
        type: Number,
        default: 0
    },
    // Split Payment Feature
    splitPaymentEnabled: {
        type: Boolean,
        default: false
    },
    splitPayments: [{
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        email: String,
        amount: {
            type: Number,
            required: true
        },
        paid: {
            type: Boolean,
            default: false
        },
        paidAt: Date
    }],
    amountPaid: {
        type: Number,
        default: 0
    },
    remainingBalance: {
        type: Number,
        default: 0
    },
    // Cancellation
    cancelledAt: Date,
    cancellationReason: String,
    refundAmount: {
        type: Number,
        default: 0
    },
    refundProcessed: {
        type: Boolean,
        default: false
    },
    // Special Requests
    specialRequests: String,
    // Host Notes
    hostNotes: String
}, {
    timestamps: true
});

// Indexes for better query performance
bookingSchema.index({ user: 1, createdAt: -1 });
bookingSchema.index({ listing: 1, checkInDate: 1, checkOutDate: 1 });
bookingSchema.index({ bookingStatus: 1 });

// Virtual for checking if booking is active
bookingSchema.virtual('isActive').get(function() {
    const now = new Date();
    return this.checkInDate <= now && this.checkOutDate >= now && this.bookingStatus === 'confirmed';
});

// Virtual for checking if booking is upcoming
bookingSchema.virtual('isUpcoming').get(function() {
    const now = new Date();
    return this.checkInDate > now && this.bookingStatus === 'confirmed';
});

// Virtual for checking if booking is past
bookingSchema.virtual('isPast').get(function() {
    const now = new Date();
    return this.checkOutDate < now;
});

// Method to calculate remaining balance
bookingSchema.methods.calculateRemainingBalance = function() {
    this.remainingBalance = this.totalPrice - this.amountPaid;
    return this.remainingBalance;
};

// Method to update payment status
bookingSchema.methods.updatePaymentStatus = function() {
    if (this.amountPaid === 0) {
        this.paymentStatus = 'pending';
    } else if (this.amountPaid >= this.totalPrice) {
        this.paymentStatus = 'paid';
    } else {
        this.paymentStatus = 'partial';
    }
};

// Pre-save middleware to calculate remaining balance
bookingSchema.pre('save', function(next) {
    this.calculateRemainingBalance();
    this.updatePaymentStatus();
    next();
});

// Static method to check availability
bookingSchema.statics.checkAvailability = async function(listingId, checkIn, checkOut, excludeBookingId = null) {
    const query = {
        listing: listingId,
        bookingStatus: { $in: ['confirmed', 'pending'] },
        $or: [
            // New booking starts during existing booking
            { checkInDate: { $lte: checkIn }, checkOutDate: { $gt: checkIn } },
            // New booking ends during existing booking
            { checkInDate: { $lt: checkOut }, checkOutDate: { $gte: checkOut } },
            // New booking completely contains existing booking
            { checkInDate: { $gte: checkIn }, checkOutDate: { $lte: checkOut } }
        ]
    };

    // Exclude current booking when updating
    if (excludeBookingId) {
        query._id = { $ne: excludeBookingId };
    }

    const conflictingBookings = await this.find(query);
    return conflictingBookings.length === 0;
};

module.exports = mongoose.model('Booking', bookingSchema);
