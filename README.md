# WanderLust (NomadNest)

A full-stack property rental platform built with Node.js, Express, MongoDB, and EJS. This application replicates core Airbnb functionality with features including user authentication, property listings, advanced booking system with dynamic pricing, reviews, and interactive maps.

**Live Demo:** [https://nomadnest-alun.onrender.com/listings](https://nomadnest-alun.onrender.com/listings)

---

## Table of Contents

- [Features](#features)
- [Technology Stack](#technology-stack)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Database Seeding](#database-seeding)
- [Project Structure](#project-structure)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Security](#security)
- [Contributing](#contributing)
- [License](#license)

---

## Features

### User Management
- Secure user registration and authentication using Passport.js
- Session-based authentication with express-session
- Password hashing with passport-local-mongoose
- Role-based authorization (guests and hosts)
- Protected routes with middleware

### Property Listings
- Complete CRUD operations for property listings
- 10 property categories: Trending, Iconic Cities, Nature, Beaches, Mountains, Swimming Pools, Castles, Camping, Ski Resorts, Vineyards
- Image upload and management via Cloudinary
- Advanced search functionality by title, location, or country
- Category-based filtering
- Detailed property information including rooms, max guests, and policies

### Booking System
- Interactive calendar widget with visual date selection
- Real-time availability checking to prevent double bookings
- Dynamic pricing engine with multiple factors:
  - Weekend surcharge (20%)
  - Seasonal pricing (15%)
  - Early bird discount (10% for 30+ days advance)
  - Last-minute discount (15% within 3 days)
  - Long-term stay discount (25% for 28+ nights)
  - Optional travel insurance (5%)
- Three refund policies: Flexible, Moderate, and Strict
- Split payment support for group bookings
- Booking management dashboard with status tracking
- Email notifications for booking confirmations

### Review System
- Star rating system (1-5 stars)
- Written review comments
- Dynamic average rating calculation
- Review count display
- Author attribution and timestamps
- Delete own reviews functionality

### Interactive Maps
- Leaflet.js integration for property location display
- Geocoding with Nominatim API
- Custom markers with property icons
- Approximate location display with radius overlay
- Interactive zoom and pan controls

### User Interface
- Responsive design optimized for mobile and desktop
- Modern CSS animations and transitions
- Sticky booking widget on desktop
- Card hover effects and image zoom
- Lazy loading for images
- Smooth scrolling and scroll-to-top button
- Professional gradient color scheme

---

## Technology Stack

### Backend
- **Node.js** - JavaScript runtime environment
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **Passport.js** - Authentication middleware
- **Joi** - Schema validation
- **Nodemailer** - Email service integration

### Frontend
- **EJS** - Embedded JavaScript templating
- **Bootstrap 5** - CSS framework
- **Font Awesome** - Icon library
- **Leaflet.js** - Interactive maps
- **Custom CSS** - Animations and styling

### Cloud Services
- **MongoDB Atlas** - Cloud database hosting
- **Cloudinary** - Image storage and optimization
- **Render** - Application deployment

### Development Tools
- **Multer** - File upload handling
- **Method-Override** - HTTP verb support
- **Connect-Flash** - Flash messages
- **Dotenv** - Environment variable management

---

## Installation

### Prerequisites
- Node.js (v14.0.0 or higher)
- MongoDB Atlas account
- Cloudinary account
- Gmail account (for email notifications)

### Setup Instructions

1. Clone the repository
```bash
git clone https://github.com/yourusername/wanderlust.git
cd wanderlust
```

2. Install dependencies
```bash
npm install
```

3. Create a `.env` file in the root directory (see [Environment Variables](#environment-variables))

4. Seed the database (optional)
```bash
node init/index.js
node init2/index.js
```

5. Start the application
```bash
node app.js
```

6. Access the application at `http://localhost:8080`

---

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# MongoDB Atlas Connection
ATLASDB_URL=mongodb+srv://username:password@cluster.mongodb.net/wanderlust?retryWrites=true&w=majority

# Session Secret
SECRET=your_random_secret_key_here

# Cloudinary Configuration
CLOUD_NAME=your_cloudinary_cloud_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_api_secret

# Email Configuration (Gmail)
EMAIL_USER=your.email@gmail.com
EMAIL_PASS=your_gmail_app_password
EMAIL_FROM=WanderLust <your.email@gmail.com>
```

**Note:** For Gmail, you need to generate an App Password from your Google Account settings with 2-Step Verification enabled.

---

## Database Seeding

The project includes seed scripts to populate the database with sample data:

### Seed Listings (50 properties)
```bash
node init/index.js
```

This creates 50 diverse property listings across all 10 categories with realistic data including:
- Property details (title, description, location, price)
- Images from Unsplash
- Various pricing ranges (₹480 - ₹10,000)
- Different refund policies and booking settings

### Seed Reviews (5-8 per listing)
```bash
node init2/index.js
```

This generates authentic reviews for each listing with:
- Random ratings (3-5 stars)
- Diverse review comments
- Proper author attribution

---

## Project Structure

```
wanderlust/
├── controllers/           # Business logic
│   ├── bookings.js       # Booking operations
│   ├── listings.js       # Listing CRUD
│   ├── reviews.js        # Review operations
│   └── users.js          # Authentication
├── models/               # Database schemas
│   ├── booking.js        # Booking model
│   ├── listing.js        # Listing model
│   ├── review.js         # Review model
│   └── user.js           # User model
├── routes/               # API routes
│   ├── booking.js        # Booking routes
│   ├── listing.js        # Listing routes
│   ├── review.js         # Review routes
│   └── user.js           # Auth routes
├── views/                # EJS templates
│   ├── bookings/         # Booking views
│   ├── listings/         # Listing views
│   ├── users/            # User views
│   ├── includes/         # Partials
│   └── layouts/          # Layout templates
├── public/               # Static files
│   ├── css/              # Stylesheets
│   ├── js/               # Client-side scripts
│   └── images/           # Static images
├── utils/                # Utility functions
│   ├── sendEmail.js      # Email service
│   ├── pricingCalculator.js  # Pricing logic
│   ├── refundCalculator.js   # Refund logic
│   ├── ExpressError.js   # Error handling
│   └── wrapAsync.js      # Async wrapper
├── middleware/           # Custom middleware
│   ├── bookingMiddleware.js  # Booking auth
│   └── middleware.js     # General middleware
├── schemas/              # Joi validation
│   ├── bookingSchema.js  # Booking validation
│   └── schema.js         # Listing/review validation
├── init/                 # Database seeding
│   ├── data.js           # Listing data
│   └── index.js          # Seed script
├── init2/                # Review seeding
│   ├── reviewData.js     # Review data
│   └── index.js          # Seed script
├── app.js                # Application entry point
├── cloudConfig.js        # Cloudinary setup
├── package.json          # Dependencies
└── .env                  # Environment variables
```

---

## Usage

### For Guests

1. **Browse Properties**
   - View all available listings on the homepage
   - Filter by category (Trending, Beaches, Mountains, etc.)
   - Search by location or property name

2. **View Property Details**
   - See detailed information, photos, and amenities
   - Check reviews and average ratings
   - View property location on interactive map

3. **Make a Booking**
   - Select check-in and check-out dates using the calendar
   - Choose number of guests
   - View real-time price calculation with breakdown
   - Add optional travel insurance
   - Receive email confirmation

4. **Manage Bookings**
   - View all bookings in "My Bookings" section
   - Filter by All, Upcoming, or Past bookings
   - View detailed booking information
   - Cancel bookings with refund calculation

5. **Leave Reviews**
   - Rate properties after your stay (1-5 stars)
   - Write detailed review comments
   - View and delete your own reviews

### For Hosts

1. **Create Listings**
   - Add new property with detailed information
   - Upload property images
   - Set pricing and availability
   - Choose refund policy

2. **Manage Properties**
   - Edit listing details and images
   - Update pricing and policies
   - Delete listings

3. **View Bookings**
   - See all bookings for your properties
   - Track booking status and payments

---

## API Endpoints

### Authentication
- `GET /signup` - User registration page
- `POST /signup` - Create new user account
- `GET /login` - Login page
- `POST /login` - Authenticate user
- `GET /logout` - Logout user

### Listings
- `GET /listings` - View all listings
- `GET /listings/new` - Create listing form
- `POST /listings` - Create new listing
- `GET /listings/:id` - View listing details
- `GET /listings/:id/edit` - Edit listing form
- `PUT /listings/:id` - Update listing
- `DELETE /listings/:id` - Delete listing

### Reviews
- `POST /listings/:id/reviews` - Create review
- `DELETE /listings/:id/reviews/:reviewId` - Delete review

### Bookings
- `GET /bookings` - View user bookings
- `POST /listings/:id/bookings` - Create booking
- `GET /bookings/:id` - View booking details
- `GET /listings/:id/calendar` - Get booking calendar data
- `DELETE /bookings/:id` - Cancel booking

---

## Security

### Authentication & Authorization
- Passport.js for secure authentication
- Session-based user management
- Password hashing using bcrypt
- Protected routes with middleware
- Owner-based authorization for listings and reviews

### Data Validation
- Server-side validation using Joi schemas
- Client-side form validation
- Input sanitization to prevent injection attacks
- File upload restrictions and validation

### Security Best Practices
- Environment variables for sensitive data
- CSRF protection via method-override
- Secure session configuration
- HTTP-only cookies
- Error handling without exposing sensitive information

---

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

Please ensure your code follows the existing style and includes appropriate tests.

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## Acknowledgments

- Inspired by Airbnb's user experience and functionality
- Built as a comprehensive full-stack web development project
- Property images sourced from Unsplash
- Map tiles provided by OpenStreetMap
- Icons from Font Awesome

---

## Contact

For questions or support, please open an issue in the GitHub repository.

**Project Link:** [https://github.com/yourusername/wanderlust](https://github.com/yourusername/wanderlust)

**Live Demo:** [https://nomadnest-alun.onrender.com/listings](https://nomadnest-alun.onrender.com/listings)
