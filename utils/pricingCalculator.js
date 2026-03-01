/**
 * Pricing Calculator Utility
 * Handles all dynamic pricing logic for bookings
 */

// High season months (June, July, August, December)
const HIGH_SEASON_MONTHS = [5, 6, 7, 11]; // 0-indexed

// Pricing multipliers and discounts
const PRICING_CONFIG = {
    WEEKEND_SURCHARGE: 0.20,        // 20% increase
    SEASONAL_SURCHARGE: 0.15,       // 15% increase for high season
    LAST_MINUTE_DISCOUNT: 0.15,     // 15% discount
    EARLY_BIRD_DISCOUNT: 0.10,      // 10% discount
    LONG_TERM_DISCOUNT: 0.25,       // 25% discount
    INSURANCE_RATE: 0.05,           // 5% of total price
    LAST_MINUTE_DAYS: 3,
    EARLY_BIRD_DAYS: 30,
    LONG_TERM_NIGHTS: 28
};

/**
 * Calculate number of nights between two dates
 */
function calculateNights(checkIn, checkOut) {
    const oneDay = 24 * 60 * 60 * 1000;
    const diffDays = Math.round(Math.abs((checkOut - checkIn) / oneDay));
    return diffDays;
}

/**
 * Calculate number of weekend nights
 */
function calculateWeekendNights(checkIn, checkOut) {
    let weekendNights = 0;
    const currentDate = new Date(checkIn);
    
    while (currentDate < checkOut) {
        const dayOfWeek = currentDate.getDay();
        // Friday (5) and Saturday (6) are considered weekend
        if (dayOfWeek === 5 || dayOfWeek === 6) {
            weekendNights++;
        }
        currentDate.setDate(currentDate.getDate() + 1);
    }
    
    return weekendNights;
}

/**
 * Check if dates fall in high season
 */
function isHighSeason(checkIn, checkOut) {
    const checkInMonth = checkIn.getMonth();
    const checkOutMonth = checkOut.getMonth();
    
    return HIGH_SEASON_MONTHS.includes(checkInMonth) || 
           HIGH_SEASON_MONTHS.includes(checkOutMonth);
}

/**
 * Calculate days until check-in
 */
function daysUntilCheckIn(checkIn) {
    const now = new Date();
    const oneDay = 24 * 60 * 60 * 1000;
    return Math.round((checkIn - now) / oneDay);
}

/**
 * Determine applicable discount type
 */
function determineDiscountType(nights, daysAdvance) {
    const discounts = [];
    
    // Long-term discount (highest priority)
    if (nights >= PRICING_CONFIG.LONG_TERM_NIGHTS) {
        discounts.push('long-term');
    }
    
    // Last-minute discount
    if (daysAdvance <= PRICING_CONFIG.LAST_MINUTE_DAYS && daysAdvance >= 0) {
        discounts.push('last-minute');
    }
    
    // Early bird discount
    if (daysAdvance >= PRICING_CONFIG.EARLY_BIRD_DAYS) {
        discounts.push('early-bird');
    }
    
    if (discounts.length === 0) return 'none';
    if (discounts.length === 1) return discounts[0];
    return 'combined';
}

/**
 * Calculate discount amount
 */
function calculateDiscount(basePrice, nights, daysAdvance) {
    let discountRate = 0;
    const discountType = determineDiscountType(nights, daysAdvance);
    
    switch (discountType) {
        case 'long-term':
            discountRate = PRICING_CONFIG.LONG_TERM_DISCOUNT;
            break;
        case 'last-minute':
            discountRate = PRICING_CONFIG.LAST_MINUTE_DISCOUNT;
            break;
        case 'early-bird':
            discountRate = PRICING_CONFIG.EARLY_BIRD_DISCOUNT;
            break;
        case 'combined':
            // Long-term takes precedence, but can stack with early-bird
            if (nights >= PRICING_CONFIG.LONG_TERM_NIGHTS) {
                discountRate = PRICING_CONFIG.LONG_TERM_DISCOUNT;
            } else if (daysAdvance >= PRICING_CONFIG.EARLY_BIRD_DAYS) {
                discountRate = PRICING_CONFIG.EARLY_BIRD_DISCOUNT;
            } else if (daysAdvance <= PRICING_CONFIG.LAST_MINUTE_DAYS) {
                discountRate = PRICING_CONFIG.LAST_MINUTE_DISCOUNT;
            }
            break;
        default:
            discountRate = 0;
    }
    
    return {
        amount: basePrice * discountRate,
        rate: discountRate,
        type: discountType
    };
}

/**
 * Main pricing calculation function
 */
function calculateBookingPrice(pricePerNight, checkInDate, checkOutDate, addInsurance = false) {
    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);
    
    // Validate dates
    if (checkIn >= checkOut) {
        throw new Error('Check-out date must be after check-in date');
    }
    
    if (checkIn < new Date()) {
        throw new Error('Check-in date cannot be in the past');
    }
    
    // Calculate nights
    const totalNights = calculateNights(checkIn, checkOut);
    const weekendNights = calculateWeekendNights(checkIn, checkOut);
    const weekdayNights = totalNights - weekendNights;
    
    // Base price calculation
    let basePrice = pricePerNight * totalNights;
    
    // Weekend surcharge
    const weekendSurcharge = (pricePerNight * weekendNights * PRICING_CONFIG.WEEKEND_SURCHARGE);
    
    // Seasonal adjustment
    let seasonalAdjustment = 0;
    if (isHighSeason(checkIn, checkOut)) {
        seasonalAdjustment = basePrice * PRICING_CONFIG.SEASONAL_SURCHARGE;
    }
    
    // Calculate subtotal before discounts
    const subtotalBeforeDiscount = basePrice + weekendSurcharge + seasonalAdjustment;
    
    // Calculate discount
    const daysAdvance = daysUntilCheckIn(checkIn);
    const discount = calculateDiscount(subtotalBeforeDiscount, totalNights, daysAdvance);
    
    // Calculate final price
    let totalPrice = subtotalBeforeDiscount - discount.amount;
    
    // Insurance
    let insuranceAmount = 0;
    if (addInsurance) {
        insuranceAmount = totalPrice * PRICING_CONFIG.INSURANCE_RATE;
        totalPrice += insuranceAmount;
    }
    
    // Round to 2 decimal places
    totalPrice = Math.round(totalPrice * 100) / 100;
    
    return {
        numberOfNights: totalNights,
        weekendNights,
        weekdayNights,
        basePrice: Math.round(basePrice * 100) / 100,
        weekendSurcharge: Math.round(weekendSurcharge * 100) / 100,
        seasonalAdjustment: Math.round(seasonalAdjustment * 100) / 100,
        subtotalBeforeDiscount: Math.round(subtotalBeforeDiscount * 100) / 100,
        discountAmount: Math.round(discount.amount * 100) / 100,
        discountType: discount.type,
        discountRate: discount.rate,
        insuranceAmount: Math.round(insuranceAmount * 100) / 100,
        totalPrice,
        priceBreakdown: {
            perNight: pricePerNight,
            nights: totalNights,
            baseTotal: basePrice,
            weekendExtra: weekendSurcharge,
            seasonalExtra: seasonalAdjustment,
            discount: discount.amount,
            insurance: insuranceAmount,
            final: totalPrice
        }
    };
}

/**
 * Calculate refund amount based on policy and cancellation date
 */
function calculateRefund(totalPrice, refundPolicy, checkInDate, cancellationDate = new Date()) {
    const daysUntilCheckIn = Math.ceil((new Date(checkInDate) - cancellationDate) / (1000 * 60 * 60 * 24));
    
    let refundPercentage = 0;
    
    switch (refundPolicy) {
        case 'flexible':
            if (daysUntilCheckIn >= 1) {
                refundPercentage = 1.0; // 100%
            } else {
                refundPercentage = 0;
            }
            break;
            
        case 'moderate':
            if (daysUntilCheckIn >= 5) {
                refundPercentage = 0.5; // 50%
            } else {
                refundPercentage = 0;
            }
            break;
            
        case 'strict':
            if (daysUntilCheckIn >= 7) {
                refundPercentage = 0.5; // 50%
            } else {
                refundPercentage = 0;
            }
            break;
            
        default:
            refundPercentage = 0;
    }
    
    const refundAmount = Math.round(totalPrice * refundPercentage * 100) / 100;
    
    return {
        refundAmount,
        refundPercentage,
        daysUntilCheckIn,
        policy: refundPolicy
    };
}

/**
 * Split payment calculation
 */
function calculateSplitPayment(totalAmount, numberOfParticipants) {
    if (numberOfParticipants < 1) {
        throw new Error('Number of participants must be at least 1');
    }
    
    const amountPerPerson = Math.round((totalAmount / numberOfParticipants) * 100) / 100;
    const remainder = Math.round((totalAmount - (amountPerPerson * numberOfParticipants)) * 100) / 100;
    
    return {
        totalAmount,
        numberOfParticipants,
        amountPerPerson,
        remainder, // First person pays the remainder
        splits: Array(numberOfParticipants).fill(null).map((_, index) => ({
            participantNumber: index + 1,
            amount: index === 0 ? amountPerPerson + remainder : amountPerPerson
        }))
    };
}

module.exports = {
    calculateBookingPrice,
    calculateRefund,
    calculateSplitPayment,
    calculateNights,
    PRICING_CONFIG
};
