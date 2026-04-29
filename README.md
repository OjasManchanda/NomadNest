<h1 align="center">🏡 WanderLust (NomadNest)</h1>

<p align="center">
  <b>WanderLust</b> is a feature-rich, full-stack Airbnb-like booking platform built with <b>Node.js</b>, <b>Express</b>, <b>MongoDB</b>, and <b>EJS</b>.  
  It provides a complete property rental experience with advanced booking system, dynamic pricing, interactive maps, reviews, and modern UI/UX.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js">
  <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express">
  <img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB">
  <img src="https://img.shields.io/badge/Passport-34E27A?style=for-the-badge&logo=passport&logoColor=white" alt="Passport">
</p>

---

## ✨ Key Features

### 🔐 User Authentication & Authorization
- Secure registration and login with Passport.js
- Session management with express-session
- Owner-based authorization for listings
- Protected routes and flash messages

### 🏠 Property Management
- Full CRUD operations for listings
- 10 property categories (Trending, Iconic Cities, Nature, Beaches, Mountains, Swimming Pools, Castles, Camping, Ski Resorts, Vineyards)
- Image upload via Cloudinary
- Advanced search and category filtering
- Detailed property information (rooms, max guests, policies)

### 📅 Comprehensive Booking System
- **Interactive Calendar Widget** - Always-visible calendar with date selection
- **Visual Availability** - Booked dates shown in grey and unclickable
- **Dynamic Pricing Engine:**
  - Weekend surcharge (+20%)
  - Seasonal pricing (+15%)
  - Early bird discount (-10% for 30+ days advance)
  - Last-minute discount (-15% within 3 days)
  - Long-term stay discount (-25% for 28+ nights)
  - Travel insurance option (+5%)
- **Real-time Price Calculator** - Live breakdown of all charges
- **Instant Booking** - Auto-confirmation with payment tracking
- **Refund Policies** - Flexible, Moderate, and Strict options
- **Split Payment Support** - Share costs with multiple participants

### ⭐ Review System
- Star rating (1-5 stars)
- Written comments
- Dynamic average rating calculation
- Review count display
- Author attribution with timestamps

### 🗺️ Interactive Maps
- Leaflet.js integration
- Geocoding with Nominatim API
- Custom markers with home icons
- Approximate location display with circle overlay
- Interactive zoom and pan controls

### 🎨 Modern UI/UX
- Responsive design (mobile-friendly)
- Smooth animations and transitions
- Card hover effects and image zoom
- Sticky booking widget on desktop
- Scroll animations and lazy loading
- Button ripple effects
- Gradient backgrounds and custom icons

### 📊 Data Management
- MongoDB Atlas integration
- Seed scripts for 50 diverse listings
- Automated review generation (5-8 per listing)
- Cascading delete operations
- Joi validation schemas

---

## ⚙️ Technologies Used

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **Passport.js** - Authentication middleware
- **Express-session** - Session management
- **Joi** - Data validation

### Frontend
- **EJS** - Templating engine
- **Bootstrap 5** - CSS framework
- **Font Awesome** - Icon library
- **Leaflet.js** - Interactive maps
- **Custom CSS** - Modern animations and effects

### Cloud Services
- **MongoDB Atlas** - Cloud database
- **Cloudinary** - Image storage and optimization

### Development Tools
- **Method-Override** - HTTP verb support
- **Multer** - File upload handling
- **Connect-Flash** - Flash messages
- **Dotenv** - Environment variables

---

## 🚀 Installation and Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB Atlas account
- Cloudinary account

### Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/WanderLust.git
   cd WanderLust
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   ATLASDB_URL=your_mongodb_atlas_connection_string
   SECRET=your_session_secret
   CLOUD_NAME=your_cloudinary_cloud_name
   CLOUD_API_KEY=your_cloudinary_api_key
   CLOUD_API_SECRET=your_cloudinary_api_secret
   ```

4. **Seed the database (optional)**
   ```bash
   node init/index.js
   node init2/index.js
   ```

5. **Run the application**
   ```bash
   node app.js
   ```

6. **Access the application**
   
   Open your browser and navigate to:
   ```
   http://localhost:8080
   ```

---

## 📁 Project Structure

```
WanderLust/
├── controllers/        # Route controllers
│   ├── bookings.js
│   ├── listings.js
│   ├── reviews.js
│   └── users.js
├── models/            # Mongoose schemas
│   ├── booking.js
│   ├── listing.js
│   ├── review.js
│   └── user.js
├── routes/            # Express routes
├── views/             # EJS templates
│   ├── bookings/
│   ├── listings/
│   ├── users/
│   └── layouts/
├── public/            # Static assets
│   ├── css/
│   ├── js/
│   └── images/
├── utils/             # Utility functions
│   ├── pricingCalculator.js
│   ├── refundCalculator.js
│   └── ExpressError.js
├── middleware/        # Custom middleware
├── schemas/           # Joi validation schemas
├── init/              # Database seeding (listings)
├── init2/             # Database seeding (reviews)
├── app.js             # Main application file
└── .env               # Environment variables
```

---

## 📖 Documentation

For detailed feature documentation and future scope, see:
- [FEATURES_AND_FUTURE_SCOPE.md](FEATURES_AND_FUTURE_SCOPE.md) - Complete feature list and enhancement ideas
- [BOOKING_SYSTEM_DOCUMENTATION.md](BOOKING_SYSTEM_DOCUMENTATION.md) - Booking system details
- [TEST_SCENARIOS.md](TEST_SCENARIOS.md) - Testing scenarios

---

## 🎯 Usage

### For Guests
1. **Browse Listings** - Explore properties by category or search
2. **View Details** - See property info, reviews, and location on map
3. **Book Property** - Select dates, guests, and complete booking
4. **Manage Bookings** - View all bookings (upcoming/past) in "My Bookings"
5. **Leave Reviews** - Rate and review properties after your stay

### For Hosts
1. **Create Listing** - Add new property with details and images
2. **Manage Properties** - Edit or delete your listings
3. **View Bookings** - See all bookings for your properties
4. **Respond to Reviews** - Engage with guest feedback

---

## 🔒 Security Features

- Password hashing with passport-local-mongoose
- Session encryption
- CSRF protection via method-override
- Input sanitization with Joi
- Authorization checks on all protected routes
- Environment variable protection

---

## 🌟 Highlights

- **50 Pre-loaded Listings** across 10 categories
- **Dynamic Pricing** with multiple discount types
- **Real-time Availability** checking
- **Interactive Maps** with geocoding
- **Responsive Design** for all devices
- **Modern Animations** and smooth transitions
- **Complete Booking Flow** from search to confirmation

---

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

---

## 👨‍💻 Author

Created with ❤️ for learning and demonstration purposes.

---

## 🙏 Acknowledgments

- Inspired by Airbnb's user experience
- Built as part of a web development learning journey
- Special thanks to the open-source community
