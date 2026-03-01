# 🏨 NomadNest Booking System Documentation

## Overview
Complete booking system with dynamic pricing, split payments, refund policies, and instant/request booking options.

---

## 📋 Table of Contents
1. [Features](#features)
2. [Models](#models)
3. [Pricing System](#pricing-system)
4. [Refund Policies](#refund-policies)
5. [Split Payments](#split-payments)
6. [API Routes](#api-routes)
7. [Usage Examples](#usage-examples)

---

## ✨ Features

### 1. Dynamic Pricing
- **Weekend Surcharge**: +20% for Friday & Saturday nights
- **Seasonal Pricing**: +15% during high season (June, July, August, December)
- **Last-Minute Discount**: -15% for bookings within 3 days
- **Early Bird Discount**: -10% for bookings 30+ days in advance
- **Long-Term Discount**: -25% for stays of 28+ nights
- **Insurance Option**: +5% of total price

### 2. Booking Types
- **Instant Booking**: Auto-confirmed immediately
- **Request Booking**: Requires host approval

### 3. Refund Policies
- **Flexible**: 100% refund if cancelled 1+ day before check-in
- **Moderate**: 50% refund if cancelled 5+ days before check-in
- **Strict**: 50% refund if cancelled 7+ days before check-in

### 4. Split Payment
- Divide total cost among multiple participants
- Track individual payment status
- Automatic balance calculation

### 5. Availability Management
- Prevent double bookings
- Real-time availability checking
- Booking calendar API

---

## 🗄️ Models

### Booking Model
```javascript
{
  user: ObjectId,              // Guest who made the booking
  listing: ObjectId,           // Property being booked
  checkInDate: Date,
  checkOutDate: Date,
  guests: Number,
  numberOfNights: Number,
  
  // Pricing breakdown
  basePrice: Number,
  weekendSurcharge: Number,
  seasonalAdjustment: Number,
  discountAmount: Number,
  discountType: String,
  totalPrice: Number,
  
  // Booking details
  bookingType: 'instant' | 'request',
  bookingStatus: 'pending' | 'confirmed' | 'cancelled' | 'completed' | 'rejected',
  paymentStatus: 'pending' | 'partial' | 'paid' | 'refunded',
  refundPolicy: 'flexible' | 'moderate' | 'strict',
  
  // Insurance
  insuranceAdded: Boolean,
  insuranceAmount: Number,
  
  // Split payments
  splitPaymentEnabled: Boolean,
  splitPayments: [{
    user: ObjectId,
    email: String,
    amount: Number,
    paid: Boolean,
    paidAt: Date
  }],
  amountPaid: Number,
  remainingBalance: Number,
  
  // Cancellation
  cancelledAt: Date,
  cancellationReason: String,
  refundAmount: Number,
  refundProcessed: Boolean,
  
  // Additional
  specialRequests: String,
  hostNotes: String
}
```

### Updated Listing Model
```javascript
{
  // ... existing fields ...
  
  // New booking-related fields
  maxGuests: Number,           // Maximum guests allowed
  instantBooking: Boolean,     // Enable instant booking
  refundPolicy: String,        // 'flexible' | 'moderate' | 'strict'
  minimumStay: Number,         // Minimum nights required
  maximumStay: Number          // Maximum nights allowed
}
```

---

## 💰 Pricing System

### Calculation Flow
```
1. Base Price = pricePerNight × numberOfNights
2. Weekend Surcharge = pricePerNight × weekendNights × 20%
3. Seasonal Adjustment = basePrice × 15% (if high season)
4. Subtotal = basePrice + weekendSurcharge + seasonalAdjustment
5. Discount = subtotal × discountRate
6. Total = subtotal - discount + insurance (if added)
```

### Example Calculation
```javascript
const { calculateBookingPrice } = require('./utils/pricingCalculator');

const pricing = calculateBookingPrice(
  1000,                    // Price per night
  '2024-07-15',           // Check-in (high season, Friday)
  '2024-07-20',           // Check-out (5 nights, 2 weekends)
  true                    // Add insurance
);

// Result:
{
  numberOfNights: 5,
  weekendNights: 2,
  weekdayNights: 3,
  basePrice: 5000,
  weekendSurcharge: 400,      // 1000 × 2 × 20%
  seasonalAdjustment: 750,    // 5000 × 15%
  subtotalBeforeDiscount: 6150,
  discountAmount: 0,
  totalPrice: 6457.50,        // 6150 + 5% insurance
  insuranceAmount: 307.50
}
```

### Discount Priority
1. **Long-term discount** (28+ nights): -25% (highest priority)
2. **Early bird** (30+ days advance): -10%
3. **Last-minute** (within 3 days): -15%

Note: Only one discount type applies per booking.

---

## 🔄 Refund Policies

### Flexible Policy
```javascript
if (daysUntilCheckIn >= 1) {
  refund = 100%
} else {
  refund = 0%
}
```

### Moderate Policy
```javascript
if (daysUntilCheckIn >= 5) {
  refund = 50%
} else {
  refund = 0%
}
```

### Strict Policy
```javascript
if (daysUntilCheckIn >= 7) {
  refund = 50%
} else {
  refund = 0%
}
```

### Usage Example
```javascript
const { processRefund } = require('./utils/refundCalculator');

const result = await processRefund(booking, 'Change of plans');

// Result:
{
  success: true,
  booking: { /* updated booking */ },
  refundDetails: {
    refundAmount: 3000,
    refundPercentage: 50,
    daysUntilCheckIn: 6,
    policy: 'moderate',
    message: '50% refund (cancelled 5+ days before check-in)'
  }
}
```

---

## 💳 Split Payments

### How It Works
1. Enable split payment during booking
2. Add participant emails
3. System divides total cost equally
4. Each participant receives payment link
5. Track individual payment status

### Example
```javascript
// Booking with split payment
{
  totalPrice: 6000,
  splitPaymentEnabled: true,
  splitPayments: [
    { email: 'user1@example.com', amount: 2000, paid: true },
    { email: 'user2@example.com', amount: 2000, paid: false },
    { email: 'user3@example.com', amount: 2000, paid: false }
  ],
  amountPaid: 2000,
  remainingBalance: 4000,
  paymentStatus: 'partial'
}
```

---

## 🛣️ API Routes

### Booking Routes
```javascript
// Create booking
POST /listings/:listingId/bookings

// View user's bookings
GET /bookings

// View host's bookings
GET /bookings/host

// View booking details
GET /bookings/:id

// Approve booking (host)
POST /bookings/:id/approve

// Reject booking (host)
POST /bookings/:id/reject

// Cancel booking (guest)
POST /bookings/:id/cancel

// Get refund preview
GET /bookings/:id/refund-preview

// Record payment
POST /bookings/:id/payment

// Record split payment
POST /bookings/:id/split-payment/:splitPaymentId

// Get availability calendar
GET /listings/:listingId/calendar
```

---

## 📝 Usage Examples

### 1. Create a Booking
```javascript
// POST /listings/:listingId/bookings
{
  "checkInDate": "2024-08-01",
  "checkOutDate": "2024-08-05",
  "guests": 2,
  "insuranceAdded": true,
  "specialRequests": "Early check-in if possible",
  "splitPaymentEnabled": true,
  "participants": [
    { "email": "friend@example.com" }
  ]
}
```

### 2. Check Availability
```javascript
const isAvailable = await Booking.checkAvailability(
  listingId,
  new Date('2024-08-01'),
  new Date('2024-08-05')
);
```

### 3. Calculate Pricing
```javascript
const { calculateBookingPrice } = require('./utils/pricingCalculator');

const pricing = calculateBookingPrice(
  listing.price,
  checkInDate,
  checkOutDate,
  insuranceAdded
);
```

### 4. Process Cancellation
```javascript
const { processRefund } = require('./utils/refundCalculator');

const result = await processRefund(booking, 'Emergency cancellation');
console.log(`Refund: ₹${result.refundDetails.refundAmount}`);
```

### 5. Record Payment
```javascript
// POST /bookings/:id/payment
{
  "amount": 3000,
  "paymentMethod": "card"
}
```

---

## 🔒 Security & Validation

### Middleware
- `isLoggedIn`: Ensure user is authenticated
- `isBookingOwner`: Verify booking ownership
- `isListingHost`: Verify host ownership
- `validateBookingDates`: Validate date ranges
- `checkAvailability`: Prevent double bookings
- `validateGuestCount`: Enforce guest limits
- `canCancelBooking`: Check cancellation eligibility

### Joi Validation
All inputs are validated using Joi schemas:
- Date validation
- Guest count limits
- Email format validation
- Payment amount validation

---

## 🚀 Integration Steps

### 1. Add to app.js
```javascript
const bookingRoutes = require('./routes/booking');
app.use('/', bookingRoutes);
```

### 2. Update Listing Form
Add fields for:
- maxGuests
- instantBooking
- refundPolicy
- minimumStay
- maximumStay

### 3. Create Views
- `views/bookings/new.ejs` - Booking form
- `views/bookings/show.ejs` - Booking details
- `views/bookings/index.ejs` - User's bookings
- `views/bookings/host-bookings.ejs` - Host's bookings

---

## 📊 Database Indexes
```javascript
// Booking indexes for performance
bookingSchema.index({ user: 1, createdAt: -1 });
bookingSchema.index({ listing: 1, checkInDate: 1, checkOutDate: 1 });
bookingSchema.index({ bookingStatus: 1 });
```

---

## 🧪 Testing Scenarios

### Test Cases
1. ✅ Create instant booking
2. ✅ Create request booking
3. ✅ Check availability (prevent double booking)
4. ✅ Calculate weekend pricing
5. ✅ Calculate seasonal pricing
6. ✅ Apply long-term discount
7. ✅ Apply early bird discount
8. ✅ Apply last-minute discount
9. ✅ Add insurance
10. ✅ Split payment among 3 people
11. ✅ Cancel with flexible policy
12. ✅ Cancel with moderate policy
13. ✅ Cancel with strict policy
14. ✅ Approve booking request
15. ✅ Reject booking request

---

## 🎯 Future Enhancements
- Payment gateway integration (Stripe/Razorpay)
- Email notifications
- SMS reminders
- Calendar sync (Google Calendar, iCal)
- Booking modifications
- Partial refunds
- Damage deposits
- Cleaning fees
- Service fees
- Tax calculations

---

## 📞 Support
For issues or questions, refer to the controller and utility files for detailed implementation.

**Happy Booking! 🎉**
