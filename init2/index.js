const mongoose = require("mongoose");
const reviewData = require("./reviewData.js");
const Review = require("../models/review.js");
const Listing = require("../models/listing.js");
const User = require("../models/user.js");

require("dotenv").config({ path: "../.env" });
const MONGO_URL = process.env.ATLASDB_URL;

main()
  .then(() => {
    console.log("✅ Connected to MongoDB");
  })
  .catch((err) => {
    console.log("❌ MongoDB Error:", err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

const seedReviews = async () => {
  try {
    console.log("🔍 Fetching all listings...");
    const listings = await Listing.find({});
    
    if (listings.length === 0) {
      console.log("❌ No listings found! Please run 'node init/index.js' first to create listings.");
      return;
    }
    
    console.log(`📋 Found ${listings.length} listings`);
    
    console.log("👥 Fetching users...");
    let users = await User.find({});
    
    // If no users exist, create demo users
    if (users.length === 0) {
      console.log("👤 No users found. Creating demo users...");
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
      console.log(`✅ Created ${users.length} demo users`);
    } else {
      console.log(`✅ Found ${users.length} existing users`);
    }
    
    console.log("⭐ Adding reviews to each listing...");
    let totalReviewsAdded = 0;
    
    for (let listing of listings) {
      // Each listing gets 5-8 random reviews
      const numReviews = Math.floor(Math.random() * 4) + 5; // 5 to 8 reviews
      
      console.log(`  📝 Adding ${numReviews} reviews to: ${listing.title}`);
      
      for (let i = 0; i < numReviews; i++) {
        // Pick a random review from our data
        const randomReviewData = reviewData.reviews[Math.floor(Math.random() * reviewData.reviews.length)];
        
        // Create review with random user as author
        const review = new Review({
          comment: randomReviewData.comment,
          rating: randomReviewData.rating,
          author: users[Math.floor(Math.random() * users.length)]._id
        });
        
        await review.save();
        
        // Add review to listing
        listing.reviews.push(review._id);
        totalReviewsAdded++;
      }
      
      await listing.save();
    }
    
    console.log(`\n🎉 Successfully added ${totalReviewsAdded} reviews!`);
    console.log(`📊 Average: ${Math.floor(totalReviewsAdded / listings.length)} reviews per listing`);
    console.log("✅ Review seeding completed!");
    
  } catch (error) {
    console.error("❌ Error seeding reviews:", error);
  } finally {
    mongoose.connection.close();
    console.log("🔌 Connection closed");
  }
};

seedReviews();
