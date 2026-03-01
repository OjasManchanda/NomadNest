# 🚀 Quick Integration Guide

## Step-by-Step Setup

### 1️⃣ Import Booking Routes in app.js

Add this line after your existing routes:

```javascript
// In app.js
const bookingRoutes = require('./routes/booking');

// Add after other routes
app.use('/', bookingRoutes);
```

### 2️⃣ Update Listing Edit/New Forms

Add these fields to your listing forms (`views/listings/new.ejs` and `views/listings/edit.ejs`):

```html
<!-- Maximum Guests -->
<div class="mb-3">
  <label for="maxGuests" class="form-label">Maximum Guests</label>
  <input type="number" class="form-control" id="maxGuests" 
         name="listing[maxGuests]" value="<%= listing.maxGuests || 4 %>" 
         min="1" required>
</div>

<!-- Instant Booking -->
<div class="mb-3 form-check">
  <input type="checkbox" class="form-check-input" id="instantBooking" 
         name="listing[instantBooking]" 
         <%= listing.instantBooking ? 'checked' : '' %>>
  <label class="form-check-label" for="instantBooking">
    Enable Instant Booking
  </label>
</div>

<!-- Refund Policy -->
<div class="mb-3">
  <label for="refundPolicy" class="form-label">Refund Policy</label>
  <select class="form-select" id="refundPolicy" name="listing[refundPolicy]" required>
    <option value="flexible" <%= listing.refundPolicy === 'flexible' ? 'selected' : '' %>>
      Flexible (100% refund 1+ day before)
    </option>
    <option value="moderate" <%= listing.refundPolicy === 'moderate' ? 'selected' : '' %>>
      Moderate (50% refund 5+ days before)
    </option>
    <option value="strict" <%= listing.refundPolicy === 'strict' ? 'selected' : '' %>>
      Strict (50% refund 7+ days before)
    </option>
  </select>
</div>

<!-- Minimum Stay -->
<div class="mb-3">
  <label for="minimumStay" class="form-label">Minimum Stay (nights)</label>
  <input type="number" class="form-control" id="minimumStay" 
         name="listing[minimumStay]" value="<%= listing.minimumStay || 1 %>" 
         min="1" required>
</div>

<!-- Maximum Stay -->
<div class="mb-3">
  <label for="maximumStay" class="form-label">Maximum Stay (nights)</label>
  <input type="number" class="form-control" id="maximumStay" 
         name="listing[maximumStay]" value="<%= listing.maximumStay || 90 %>" 
         min="1" required>
</div>
```

### 3️⃣ Add "Book Now" Button to Listing Show Page

In `views/listings/show.ejs`, add this button:

```html
<!-- Add after the listing details, before reviews -->
<div class="card mt-4">
  <div class="card-body">
    <h5 class="card-title">Book this property</h5>
    <p class="card-text">
      <strong>₹<%= listing.price.toLocaleString("en-IN") %></strong> per night
    </p>
    <% if (currUser) { %>
      <a href="/listings/<%= listing._id %>/book" class="btn btn-primary btn-lg w-100">
        <i class="fa-solid fa-calendar-check me-2"></i>
        <%= listing.instantBooking ? 'Book Now' : 'Request to Book' %>
      </a>
    <% } else { %>
      <a href="/login" class="btn btn-primary btn-lg w-100">
        Login to Book
      </a>
    <% } %>
    
    <div class="mt-3">
      <small class="text-muted">
        <i class="fa-solid fa-shield-halved me-1"></i>
        <%= listing.refundPolicy.charAt(0).toUpperCase() + listing.refundPolicy.slice(1) %> cancellation policy
      </small>
    </div>
  </div>
</div>
```

### 4️⃣ Create Booking Views

Create these new view files:

#### `views/bookings/new.ejs`
```html
<% layout('/layouts/boilerplate') %>

<div class="container mt-4">
  <div class="row justify-content-center">
    <div class="col-md-8">
      <h2 class="mb-4">Book <%= listing.title %></h2>
      
      <div class="row">
        <div class="col-md-7">
          <form method="POST" action="/listings/<%= listing._id %>/bookings" class="needs-validation" novalidate>
            
            <!-- Check-in Date -->
            <div class="mb-3">
              <label for="checkInDate" class="form-label">Check-in Date</label>
              <input type="date" class="form-control" id="checkInDate" 
                     name="checkInDate" required min="<%= new Date().toISOString().split('T')[0] %>">
            </div>
            
            <!-- Check-out Date -->
            <div class="mb-3">
              <label for="checkOutDate" class="form-label">Check-out Date</label>
              <input type="date" class="form-control" id="checkOutDate" 
                     name="checkOutDate" required>
            </div>
            
            <!-- Guests -->
            <div class="mb-3">
              <label for="guests" class="form-label">Number of Guests</label>
              <input type="number" class="form-control" id="guests" 
                     name="guests" min="1" max="<%= listing.maxGuests %>" 
                     value="1" required>
              <small class="text-muted">Maximum <%= listing.maxGuests %> guests</small>
            </div>
            
            <!-- Insurance -->
            <div class="mb-3 form-check">
              <input type="checkbox" class="form-check-input" id="insuranceAdded" 
                     name="insuranceAdded">
              <label class="form-check-label" for="insuranceAdded">
                Add travel insurance (+5% of total)
              </label>
            </div>
            
            <!-- Special Requests -->
            <div class="mb-3">
              <label for="specialRequests" class="form-label">Special Requests (Optional)</label>
              <textarea class="form-control" id="specialRequests" 
                        name="specialRequests" rows="3" 
                        placeholder="Early check-in, extra towels, etc."></textarea>
            </div>
            
            <!-- Split Payment -->
            <div class="mb-3 form-check">
              <input type="checkbox" class="form-check-input" id="splitPaymentEnabled" 
                     name="splitPaymentEnabled">
              <label class="form-check-label" for="splitPaymentEnabled">
                Split payment with friends
              </label>
            </div>
            
            <div id="participantsSection" style="display: none;">
              <div class="mb-3">
                <label class="form-label">Add Participants</label>
                <div id="participantsList">
                  <div class="input-group mb-2">
                    <input type="email" class="form-control" 
                           name="participants[0][email]" 
                           placeholder="friend@example.com">
                  </div>
                </div>
                <button type="button" class="btn btn-sm btn-outline-secondary" 
                        onclick="addParticipant()">
                  + Add Another
                </button>
              </div>
            </div>
            
            <button type="submit" class="btn btn-primary btn-lg w-100">
              <%= listing.instantBooking ? 'Confirm Booking' : 'Request to Book' %>
            </button>
          </form>
        </div>
        
        <div class="col-md-5">
          <div class="card">
            <img src="<%= listing.image.url %>" class="card-img-top" alt="<%= listing.title %>">
            <div class="card-body">
              <h5 class="card-title"><%= listing.title %></h5>
              <p class="card-text">
                <strong>₹<%= listing.price.toLocaleString("en-IN") %></strong> / night
              </p>
              <hr>
              <p class="mb-1"><small class="text-muted">Refund Policy:</small></p>
              <p><strong><%= listing.refundPolicy.charAt(0).toUpperCase() + listing.refundPolicy.slice(1) %></strong></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<script>
  // Split payment toggle
  document.getElementById('splitPaymentEnabled').addEventListener('change', function() {
    document.getElementById('participantsSection').style.display = 
      this.checked ? 'block' : 'none';
  });
  
  // Add participant
  let participantCount = 1;
  function addParticipant() {
    const html = `
      <div class="input-group mb-2">
        <input type="email" class="form-control" 
               name="participants[${participantCount}][email]" 
               placeholder="friend@example.com">
      </div>
    `;
    document.getElementById('participantsList').insertAdjacentHTML('beforeend', html);
    participantCount++;
  }
</script>
```

#### `views/bookings/show.ejs`
```html
<% layout('/layouts/boilerplate') %>

<div class="container mt-4">
  <h2>Booking Details</h2>
  
  <div class="row mt-4">
    <div class="col-md-8">
      <div class="card">
        <div class="card-body">
          <h5>Booking #<%= booking._id %></h5>
          
          <div class="alert alert-<%= booking.bookingStatus === 'confirmed' ? 'success' : 'warning' %>">
            Status: <strong><%= booking.bookingStatus.toUpperCase() %></strong>
          </div>
          
          <p><strong>Property:</strong> <%= booking.listing.title %></p>
          <p><strong>Check-in:</strong> <%= booking.checkInDate.toDateString() %></p>
          <p><strong>Check-out:</strong> <%= booking.checkOutDate.toDateString() %></p>
          <p><strong>Guests:</strong> <%= booking.guests %></p>
          <p><strong>Nights:</strong> <%= booking.numberOfNights %></p>
          
          <hr>
          
          <h6>Price Breakdown</h6>
          <p>Base Price: ₹<%= booking.basePrice.toLocaleString("en-IN") %></p>
          <% if (booking.weekendSurcharge > 0) { %>
            <p>Weekend Surcharge: +₹<%= booking.weekendSurcharge.toLocaleString("en-IN") %></p>
          <% } %>
          <% if (booking.seasonalAdjustment > 0) { %>
            <p>Seasonal Adjustment: +₹<%= booking.seasonalAdjustment.toLocaleString("en-IN") %></p>
          <% } %>
          <% if (booking.discountAmount > 0) { %>
            <p class="text-success">
              Discount (<%= booking.discountType %>): -₹<%= booking.discountAmount.toLocaleString("en-IN") %>
            </p>
          <% } %>
          <% if (booking.insuranceAdded) { %>
            <p>Insurance: +₹<%= booking.insuranceAmount.toLocaleString("en-IN") %></p>
          <% } %>
          
          <h5 class="mt-3">Total: ₹<%= booking.totalPrice.toLocaleString("en-IN") %></h5>
          
          <p><strong>Payment Status:</strong> <%= booking.paymentStatus.toUpperCase() %></p>
          <p><strong>Amount Paid:</strong> ₹<%= booking.amountPaid.toLocaleString("en-IN") %></p>
          <p><strong>Remaining:</strong> ₹<%= booking.remainingBalance.toLocaleString("en-IN") %></p>
          
          <% if (booking.bookingStatus === 'confirmed' && booking.remainingBalance > 0) { %>
            <form method="POST" action="/bookings/<%= booking._id %>/payment" class="mt-3">
              <button type="submit" class="btn btn-success">Make Payment</button>
            </form>
          <% } %>
          
          <% if (booking.bookingStatus === 'confirmed' || booking.bookingStatus === 'pending') { %>
            <form method="POST" action="/bookings/<%= booking._id %>/cancel" class="mt-3">
              <button type="submit" class="btn btn-danger" 
                      onclick="return confirm('Are you sure you want to cancel this booking?')">
                Cancel Booking
              </button>
            </form>
          <% } %>
        </div>
      </div>
    </div>
  </div>
</div>
```

#### `views/bookings/index.ejs`
```html
<% layout('/layouts/boilerplate') %>

<div class="container mt-4">
  <h2>My Bookings</h2>
  
  <% if (bookings.length === 0) { %>
    <p class="text-muted mt-4">You don't have any bookings yet.</p>
    <a href="/listings" class="btn btn-primary">Browse Listings</a>
  <% } else { %>
    <div class="row mt-4">
      <% bookings.forEach(booking => { %>
        <div class="col-md-6 mb-4">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title"><%= booking.listing.title %></h5>
              <p class="card-text">
                <strong>Check-in:</strong> <%= booking.checkInDate.toDateString() %><br>
                <strong>Check-out:</strong> <%= booking.checkOutDate.toDateString() %><br>
                <strong>Status:</strong> 
                <span class="badge bg-<%= booking.bookingStatus === 'confirmed' ? 'success' : 'warning' %>">
                  <%= booking.bookingStatus %>
                </span>
              </p>
              <p><strong>Total:</strong> ₹<%= booking.totalPrice.toLocaleString("en-IN") %></p>
              <a href="/bookings/<%= booking._id %>" class="btn btn-primary">View Details</a>
            </div>
          </div>
        </div>
      <% }) %>
    </div>
  <% } %>
</div>
```

### 5️⃣ Add Navigation Links

In `views/includes/navbar.ejs`, add:

```html
<% if (currUser) { %>
  <a class="nav-link" href="/bookings">My Bookings</a>
  <a class="nav-link" href="/bookings/host">My Properties</a>
<% } %>
```

### 6️⃣ Test the System

1. Start your server: `node app.js`
2. Create/edit a listing with new booking fields
3. Click "Book Now" on a listing
4. Fill in booking details
5. Check booking status
6. Test cancellation and refunds

---

## 🎯 Quick Test Checklist

- [ ] Create a listing with booking settings
- [ ] Book a property (instant booking)
- [ ] Book a property (request booking)
- [ ] View booking details
- [ ] Test weekend pricing
- [ ] Test long-term discount (28+ nights)
- [ ] Test early bird discount (30+ days advance)
- [ ] Test last-minute discount (within 3 days)
- [ ] Add insurance
- [ ] Enable split payment
- [ ] Cancel booking and check refund
- [ ] Approve/reject booking request (as host)

---

## 🐛 Troubleshooting

### Issue: Dates not validating
**Solution**: Ensure date inputs have proper min/max attributes

### Issue: Pricing not calculating
**Solution**: Check that listing has a valid price field

### Issue: Double booking occurring
**Solution**: Verify `checkAvailability` is called before saving

### Issue: Refund not processing
**Solution**: Ensure booking has `amountPaid` > 0

---

## 📚 Additional Resources

- See `BOOKING_SYSTEM_DOCUMENTATION.md` for detailed API docs
- Check `utils/pricingCalculator.js` for pricing logic
- Review `utils/refundCalculator.js` for refund calculations
- Examine `controllers/bookings.js` for all booking operations

**You're all set! Happy coding! 🚀**
