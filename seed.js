require("dotenv").config();
const mongoose = require("mongoose");
const initData = require("./init/data");

const User = require("./models/user");
const Listing = require("./models/listing");
const Review = require("./models/review");

mongoose.connect(process.env.ATLASDB_URL)
    .then(() => console.log("✅ MongoDB Connected"))
    .catch(err => console.log("❌ Mongo Error:", err));

// Diverse review comments
const reviewComments = [
    "Absolutely stunning property! The views were breathtaking and the host was incredibly welcoming.",
    "Perfect getaway spot. Everything was exactly as described and more!",
    "We had an amazing time here. The location is ideal and the amenities are top-notch.",
    "Beautiful place with great attention to detail. Would definitely recommend!",
    "The photos don't do it justice - it's even better in person!",
    "Wonderful experience from start to finish. The host went above and beyond.",
    "Clean, comfortable, and conveniently located. Couldn't ask for more!",
    "This place exceeded all our expectations. Perfect for a relaxing vacation.",
    "Great value for money. The property is well-maintained and cozy.",
    "Loved every minute of our stay. The neighborhood is charming and safe.",
    "Fantastic location with easy access to attractions. Highly recommend!",
    "The host was very responsive and helpful throughout our stay.",
    "Beautiful property in a peaceful setting. Perfect for unwinding.",
    "Everything was spotless and well-organized. Five stars!",
    "Amazing hospitality! We felt right at home from the moment we arrived.",
    "The amenities were excellent and the space was very comfortable.",
    "Incredible views and a truly unique experience. Worth every penny!",
    "Very spacious and well-equipped. Great for families or groups.",
    "The location is unbeatable. Walking distance to everything we needed.",
    "Charming property with lots of character. We'll definitely be back!",
    "Good place but could use some minor updates. Overall satisfied.",
    "Nice stay, though the WiFi was a bit slow. Everything else was great!",
    "Decent property for the price. Met our basic needs.",
    "The place was okay. A bit smaller than expected but clean.",
    "Average experience. Nothing special but nothing terrible either.",
];

const seedDB = async () => {
    console.log("🗑 Deleting old data...");
    await Review.deleteMany({});
    await Listing.deleteMany({});
    await User.deleteMany({});

    // Create 5 demo users
    console.log("👥 Creating users...");
    const users = [];
    
    for (let i = 1; i <= 5; i++) {
        const user = await User.register(
            new User({
                username: `user${i}`,
                email: `user${i}@example.com`
            }),
            "password123"
        );
        users.push(user);
    }
    
    console.log(`✅ Created ${users.length} users`);

    // Create listings from data.js
    console.log("🏠 Creating listings...");
    const listings = [];
    
    for (let listingData of initData.data) {
        // Assign random owner from users
        listingData.owner = users[Math.floor(Math.random() * users.length)]._id;
        
        const listing = new Listing(listingData);
        await listing.save();
        listings.push(listing);
    }
    
    console.log(`✅ Created ${listings.length} listings`);

    // Create diverse reviews for each listing
    console.log("⭐ Creating reviews...");
    let totalReviews = 0;
    
    for (let listing of listings) {
        // Each listing gets 7-12 random reviews
        const numReviews = Math.floor(Math.random() * 6) + 7; // 7 to 12 reviews
        
        for (let i = 0; i < numReviews; i++) {
            const review = new Review({
                comment: reviewComments[Math.floor(Math.random() * reviewComments.length)],
                rating: Math.floor(Math.random() * 5) + 1, // 1-5 stars
                author: users[Math.floor(Math.random() * users.length)]._id
            });
            
            await review.save();
            listing.reviews.push(review._id);
            totalReviews++;
        }
        
        await listing.save();
    }
    
    console.log(`✅ Created ${totalReviews} reviews (${Math.floor(totalReviews/listings.length)} avg per listing)`);
    console.log("🌱 Database Successfully Seeded!");
};

seedDB().then(() => {
    mongoose.connection.close();
    console.log("🔌 Connection Closed");
});
