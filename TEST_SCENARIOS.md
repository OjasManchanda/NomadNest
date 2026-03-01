# 🧪 Booking System Test Scenarios

## Test Data Setup

### Sample Listing
```javascript
{
  title: "Luxury Beach Villa",
  price: 5000,
  maxGuests: 6,
  instantBooking: true,
  refundPolicy: "moderate",
  minimumStay: 2,
  maximumStay: 30
}
```

---

## 1️⃣ Dynamic Pricing Tests

### Test 1.1: Weekend Pricing
**Scenario**: Book Friday to Sunday (2 nights, both weekend)
```
Check-in: Friday, June 14, 2024
Check-out: Sunday, June 16, 2024
Price per night: ₹5,000

Expected Calculation:
- Base: 5000 × 2 = ₹10,000
- Weekend surcharge: 5000 × 2 × 20% = ₹2,000
- Total: ₹12,000
```

### Test 1.2: Seasonal Pricing
**Scenario**: Book during high season (July)
```
Check-in: July 15, 2024
Check-out: July 20, 2024
Price per night: ₹5,000

Expected Calculation:
- Base: 5000 × 5 = ₹25,000
- Weekend surcharge: 5000 × 2 × 20% = ₹2,000
- Seasonal: 25000 × 15% = ₹3,750
- Total: ₹30,750
```

### Test 1.3: Long-Term Discount
**Scenario**: Book 30 nights
```
Check-in: August 1, 2024
Check-out: August 31, 2024
Price per night: ₹5,000

Expected Calculation:
- Base: 5000 × 30 = ₹150,000
- Weekend surcharge: ~₹8,000
- Subtotal: ₹158,000
- Long-term discount (25%): -₹39,500
- Total: ₹118,500
```

### Test 1.4: Early Bird Discount
**Scenario**: Book 45 days in advance
```
Today: June 1, 2024
Check-in: July 15, 2024 (45 days advance)
Check-out: July 18, 2024
Price per night: ₹5,000

Expected Calculation:
- Base: 5000 × 3 = ₹15,000
- Early bird discount (10%): -₹1,500
- Total: ₹13,500
```

### Test 1.5: Last-Minute Discount
**Scenario**: Book 2 days before check-in
```
Today: August 13, 2024
Check-in: August 15, 2024 (2 days advance)
Check-out: August 18, 2024
Price per night: ₹5,000

Expected Calculation:
- Base: 5000 × 3 = ₹15,000
- Last-minute discount (15%): -₹2,250
- Total: ₹12,750
```

### Test 1.6: Insurance Addition
**Scenario**: Add travel insurance
```
Base total: ₹20,000
Insurance: 20000 × 5% = ₹1,000
Final total: ₹21,000
```

---

## 2️⃣ Booking Type Tests

### Test 2.1: Instant Booking
**Scenario**: Listing has instantBooking = true
```
Expected:
- bookingType: "instant"
- bookingStatus: "confirmed"
- No host approval needed
```

### Test 2.2: Request Booking
**Scenario**: Listing has instantBooking = false
```
Expected:
- bookingType: "request"
- bookingStatus: "pending"
- Requires host approval
```

---

## 3️⃣ Availability Tests

### Test 3.1: Prevent Double Booking
**Scenario**: Existing booking from Aug 10-15
```
Attempt 1: Aug 12-14 → ❌ Should fail (overlaps)
Attempt 2: Aug 8-11 → ❌ Should fail (overlaps)
Attempt 3: Aug 14-16 → ❌ Should fail (overlaps)
Attempt 4: Aug 16-18 → ✅ Should succeed (no overlap)
```

### Test 3.2: Same-Day Check-in/Check-out
**Scenario**: Check-out on Aug 15, new check-in on Aug 15
```
Expected: ✅ Should be allowed
```

---

## 4️⃣ Refund Policy Tests

### Test 4.1: Flexible Policy - Full Refund
**Scenario**: Cancel 2 days before check-in
```
Booking: ₹20,000
Days until check-in: 2
Policy: Flexible

Expected:
- Refund: ₹20,000 (100%)
- Message: "Full refund (cancelled 1+ days before check-in)"
```

### Test 4.2: Flexible Policy - No Refund
**Scenario**: Cancel on check-in day
```
Booking: ₹20,000
Days until check-in: 0
Policy: Flexible

Expected:
- Refund: ₹0 (0%)
- Message: "No refund (cancelled less than 1 day before check-in)"
```

### Test 4.3: Moderate Policy - 50% Refund
**Scenario**: Cancel 6 days before check-in
```
Booking: ₹20,000
Days until check-in: 6
Policy: Moderate

Expected:
- Refund: ₹10,000 (50%)
- Message: "50% refund (cancelled 5+ days before check-in)"
```

### Test 4.4: Moderate Policy - No Refund
**Scenario**: Cancel 3 days before check-in
```
Booking: ₹20,000
Days until check-in: 3
Policy: Moderate

Expected:
- Refund: ₹0 (0%)
- Message: "No refund (cancelled less than 5 days before check-in)"
```

### Test 4.5: Strict Policy - 50% Refund
**Scenario**: Cancel 10 days before check-in
```
Booking: ₹20,000
Days until check-in: 10
Policy: Strict

Expected:
- Refund: ₹10,000 (50%)
- Message: "50% refund (cancelled 7+ days before check-in)"
```

### Test 4.6: Strict Policy - No Refund
**Scenario**: Cancel 5 days before check-in
```
Booking: ₹20,000
Days until check-in: 5
Policy: Strict

Expected:
- Refund: ₹0 (0%)
- Message: "No refund (cancelled less than 7 days before check-in)"
```

---

## 5️⃣ Split Payment Tests

### Test 5.1: Split Among 3 People
**Scenario**: Total ₹9,000, 3 participants
```
Expected:
- Person 1: ₹3,000
- Person 2: ₹3,000
- Person 3: ₹3,000
- Total: ₹9,000
```

### Test 5.2: Split with Remainder
**Scenario**: Total ₹10,000, 3 participants
```
Expected:
- Person 1: ₹3,333.34 (includes remainder)
- Person 2: ₹3,333.33
- Person 3: ₹3,333.33
- Total: ₹10,000
```

### Test 5.3: Track Individual Payments
**Scenario**: 3 participants, 1 paid
```
splitPayments: [
  { email: "user1@ex.com", amount: 3333.34, paid: true },
  { email: "user2@ex.com", amount: 3333.33, paid: false },
  { email: "user3@ex.com", amount: 3333.33, paid: false }
]

Expected:
- amountPaid: ₹3,333.34
- remainingBalance: ₹6,666.66
- paymentStatus: "partial"
```

### Test 5.4: All Payments Complete
**Scenario**: All 3 participants paid
```
Expected:
- amountPaid: ₹10,000
- remainingBalance: ₹0
- paymentStatus: "paid"
```

---

## 6️⃣ Validation Tests

### Test 6.1: Past Check-in Date
**Scenario**: Try to book with check-in in the past
```
Check-in: Yesterday
Expected: ❌ Error "Check-in date cannot be in the past"
```

### Test 6.2: Check-out Before Check-in
**Scenario**: Check-out date before check-in
```
Check-in: Aug 15
Check-out: Aug 10
Expected: ❌ Error "Check-out date must be after check-in date"
```

### Test 6.3: Exceed Maximum Guests
**Scenario**: Book for 8 guests, max is 6
```
Expected: ❌ Error "Maximum 6 guests allowed"
```

### Test 6.4: Below Minimum Stay
**Scenario**: Book 1 night, minimum is 2
```
Expected: ❌ Error "Minimum stay is 2 nights"
```

### Test 6.5: Exceed Maximum Stay
**Scenario**: Book 100 nights, maximum is 30
```
Expected: ❌ Error "Maximum stay is 30 nights"
```

---

## 7️⃣ Host Actions Tests

### Test 7.1: Approve Pending Booking
**Scenario**: Host approves request booking
```
Initial: bookingStatus = "pending"
After approval: bookingStatus = "confirmed"
Expected: ✅ Success message
```

### Test 7.2: Reject Pending Booking
**Scenario**: Host rejects request booking
```
Initial: bookingStatus = "pending"
After rejection: bookingStatus = "rejected"
Expected: ✅ Success message with reason
```

### Test 7.3: Non-Host Cannot Approve
**Scenario**: Guest tries to approve their own booking
```
Expected: ❌ Error "Only the host can approve bookings"
```

---

## 8️⃣ Payment Status Tests

### Test 8.1: No Payment
```
amountPaid: 0
Expected: paymentStatus = "pending"
```

### Test 8.2: Partial Payment
```
totalPrice: 10000
amountPaid: 5000
Expected: paymentStatus = "partial"
```

### Test 8.3: Full Payment
```
totalPrice: 10000
amountPaid: 10000
Expected: paymentStatus = "paid"
```

### Test 8.4: Overpayment Prevention
```
totalPrice: 10000
amountPaid: 8000
Attempt to pay: 3000
Expected: ❌ Error "Payment amount exceeds remaining balance"
```

---

## 9️⃣ Edge Cases

### Test 9.1: Booking on Leap Year
**Scenario**: Feb 29, 2024 (leap year)
```
Expected: ✅ Should handle correctly
```

### Test 9.2: Year-End Booking
**Scenario**: Dec 30, 2024 to Jan 5, 2025
```
Expected: ✅ Should calculate correctly across years
```

### Test 9.3: Same Check-in and Check-out
**Scenario**: Aug 15 to Aug 15
```
Expected: ❌ Error "Check-out date must be after check-in date"
```

### Test 9.4: Very Long Booking
**Scenario**: 365 nights
```
Expected: ❌ Error "Maximum booking duration is 90 days"
```

---

## 🎯 Manual Testing Checklist

### User Flow
- [ ] Browse listings
- [ ] Click "Book Now"
- [ ] Select dates
- [ ] See price calculation update
- [ ] Add insurance
- [ ] Enable split payment
- [ ] Submit booking
- [ ] Receive confirmation
- [ ] View booking details
- [ ] Make payment
- [ ] Cancel booking
- [ ] Receive refund

### Host Flow
- [ ] View booking requests
- [ ] Approve booking
- [ ] Reject booking
- [ ] View confirmed bookings
- [ ] Check calendar availability

### Admin Checks
- [ ] No double bookings
- [ ] Correct price calculations
- [ ] Proper refund amounts
- [ ] Payment tracking accuracy
- [ ] Database consistency

---

## 📊 Performance Tests

### Load Testing
- [ ] 100 concurrent bookings
- [ ] 1000 availability checks
- [ ] Complex date range queries
- [ ] Large split payment groups

### Database Queries
- [ ] Index usage verification
- [ ] Query optimization
- [ ] Response time < 200ms

---

## 🔒 Security Tests

- [ ] Authorization checks (booking owner)
- [ ] Authorization checks (listing host)
- [ ] SQL injection prevention
- [ ] XSS prevention
- [ ] CSRF protection
- [ ] Rate limiting

---

## ✅ Success Criteria

All tests should:
1. Execute without errors
2. Return expected results
3. Maintain data integrity
4. Handle edge cases gracefully
5. Provide clear error messages

**Happy Testing! 🎉**
