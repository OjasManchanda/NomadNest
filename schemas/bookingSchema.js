const Joi = require('joi');

// Booking creation schema
module.exports.bookingSchema = Joi.object({
    checkInDate: Joi.date().required().min('now').messages({
        'date.base': 'Check-in date must be a valid date',
        'date.min': 'Check-in date cannot be in the past',
        'any.required': 'Check-in date is required'
    }),
    checkOutDate: Joi.date().required().greater(Joi.ref('checkInDate')).messages({
        'date.base': 'Check-out date must be a valid date',
        'date.greater': 'Check-out date must be after check-in date',
        'any.required': 'Check-out date is required'
    }),
    guests: Joi.number().required().min(1).max(20).messages({
        'number.base': 'Number of guests must be a number',
        'number.min': 'At least 1 guest is required',
        'number.max': 'Maximum 20 guests allowed',
        'any.required': 'Number of guests is required'
    }),
    insuranceAdded: Joi.boolean().optional(),
    specialRequests: Joi.string().optional().max(500).messages({
        'string.max': 'Special requests cannot exceed 500 characters'
    }),
    splitPaymentEnabled: Joi.boolean().optional(),
    participants: Joi.array().optional().items(
        Joi.object({
            email: Joi.string().email().required().messages({
                'string.email': 'Please provide a valid email address',
                'any.required': 'Participant email is required'
            })
        })
    ).max(10).messages({
        'array.max': 'Maximum 10 participants allowed for split payment'
    })
});

// Payment recording schema
module.exports.paymentSchema = Joi.object({
    amount: Joi.number().required().positive().messages({
        'number.base': 'Payment amount must be a number',
        'number.positive': 'Payment amount must be positive',
        'any.required': 'Payment amount is required'
    }),
    paymentMethod: Joi.string().required().valid('card', 'upi', 'netbanking', 'wallet').messages({
        'any.only': 'Invalid payment method',
        'any.required': 'Payment method is required'
    })
});

// Cancellation schema
module.exports.cancellationSchema = Joi.object({
    reason: Joi.string().optional().max(500).messages({
        'string.max': 'Cancellation reason cannot exceed 500 characters'
    })
});

// Booking approval/rejection schema
module.exports.bookingActionSchema = Joi.object({
    reason: Joi.string().optional().max(500).messages({
        'string.max': 'Reason cannot exceed 500 characters'
    }),
    hostNotes: Joi.string().optional().max(500).messages({
        'string.max': 'Host notes cannot exceed 500 characters'
    })
});
