require("dotenv").config();
const mongoose = require("mongoose");

const User = require("./models/user");
const Listing = require("./models/listing");
const Review = require("./models/review");

mongoose.connect(process.env.ATLASDB_URL)
    .then(() => console.log("✅ MongoDB Connected"))
    .catch(err => console.log("❌ Mongo Error:", err));

const cities = [
    {
        city: "Goa", country: "India",
        imageUrl: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800"
    },
    {
        city: "Manali", country: "India",
        imageUrl: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=800"
    },
    {
        city: "Jaipur", country: "India",
        imageUrl: "https://images.unsplash.com/photo-1477587458883-47145ed94245?w=800"
    },
    {
        city: "Mumbai", country: "India",
        imageUrl: "https://images.unsplash.com/photo-1529253355930-ddbe423a2ac7?w=800"
    },
    {
        city: "Kerala", country: "India",
        imageUrl: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800"
    },
    {
        city: "Bali", country: "Indonesia",
        imageUrl: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800"
    },
    {
        city: "Paris", country: "France",
        imageUrl: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800"
    },
    {
        city: "Tokyo", country: "Japan",
        imageUrl: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800"
    },
    {
        city: "New York", country: "USA",
        imageUrl: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800"
    },
    {
        city: "Dubai", country: "UAE",
        imageUrl: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800"
    },
    {
        city: "London", country: "UK",
        imageUrl: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800"
    },
    {
        city: "Rome", country: "Italy",
        imageUrl: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800"
    },
    {
        city: "Barcelona", country: "Spain",
        imageUrl: "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=800"
    },
    {
        city: "Amsterdam", country: "Netherlands",
        imageUrl: "https://images.unsplash.com/photo-1534351590666-13e3e96b5017?w=800"
    },
    {
        city: "Bangkok", country: "Thailand",
        imageUrl: "https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=800"
    },
    {
        city: "Singapore", country: "Singapore",
        imageUrl: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=800"
    },
    {
        city: "Sydney", country: "Australia",
        imageUrl: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=800"
    },
    {
        city: "Cape Town", country: "South Africa",
        imageUrl: "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=800"
    },
    {
        city: "Toronto", country: "Canada",
        imageUrl: "https://images.unsplash.com/photo-1517090504586-fde19ea6066f?w=800"
    },
    {
        city: "Los Angeles", country: "USA",
        imageUrl: "https://images.unsplash.com/photo-1534190760961-74e8c1c5c3da?w=800"
    },
    {
        city: "Maldives", country: "Maldives",
        imageUrl: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800"
    },
    {
        city: "Phuket", country: "Thailand",
        imageUrl: "https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?w=800"
    },
    {
        city: "Zurich", country: "Switzerland",
        imageUrl: "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=800"
    },
    {
        city: "Venice", country: "Italy",
        imageUrl: "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=800"
    },
    {
        city: "San Francisco", country: "USA",
        imageUrl: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800"
    },
    {
        city: "Istanbul", country: "Turkey",
        imageUrl: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=800"
    },
    {
        city: "Seoul", country: "South Korea",
        imageUrl: "https://images.unsplash.com/photo-1601621915196-2621bfb0cd6e?w=800"
    },
    {
        city: "Hong Kong", country: "China",
        imageUrl: "https://images.unsplash.com/photo-1536599018102-9f803c140fc1?w=800"
    },
    {
        city: "Vienna", country: "Austria",
        imageUrl: "https://images.unsplash.com/photo-1516550893885-985c836c5e8e?w=800"
    },
    {
        city: "Prague", country: "Czech Republic",
        imageUrl: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=800"
    },
    {
        city: "Santorini", country: "Greece",
        imageUrl: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800"
    },
    {
        city: "Budapest", country: "Hungary",
        imageUrl: "https://images.unsplash.com/photo-1549140600-78c9b8275e9d?w=800"
    },
    {
        city: "Hanoi", country: "Vietnam",
        imageUrl: "https://images.unsplash.com/photo-1557750255-c76072a7aad1?w=800"
    },
    {
        city: "Lisbon", country: "Portugal",
        imageUrl: "https://images.unsplash.com/photo-1558611848-73f7eb4001a1?w=800"
    },
    {
        city: "Reykjavik", country: "Iceland",
        imageUrl: "https://images.unsplash.com/photo-1531168556467-80aace0d0144?w=800"
    },
    {
        city: "Aspen", country: "USA",
        imageUrl: "https://images.unsplash.com/photo-1605540436563-5bca919ae27d?w=800"
    },
    {
        city: "Napa Valley", country: "USA",
        imageUrl: "https://images.unsplash.com/photo-1506377585622-bedcbb5a8b35?w=800"
    },
    {
        city: "Edinburgh", country: "Scotland",
        imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800"
    },
    {
        city: "Marrakech", country: "Morocco",
        imageUrl: "https://images.unsplash.com/photo-1597211833712-5e41faa202ea?w=800"
    },
    {
        city: "Queenstown", country: "New Zealand",
        imageUrl: "https://images.unsplash.com/photo-1507699622108-4be3abd695ad?w=800"
    }
];

const categoriesList = [
    "Trending",
    "Iconic Cities",
    "Nature",
    "Beaches",
    "Mountains",
    "Swimming Pools",
    "Castles",
    "Camping",
    "Ski Resorts",
    "Vineyards"
];

const random = (arr) => arr[Math.floor(Math.random() * arr.length)];

const seedDB = async () => {
    console.log("🗑 Deleting old data...");
    await Review.deleteMany({});
    await Listing.deleteMany({});
    await User.deleteMany({});

    // --------------------
    // 1️⃣ Create 5 Users
    // --------------------
    const users = [];

    for (let i = 1; i <= 5; i++) {
        const user = await User.register(
            new User({
                username: `user${i}`,
                email: `user${i}@mail.com`
            }),
            "password123"
        );
        users.push(user);
    }

    console.log("👥 5 Users Created");

    // --------------------
    // 2️⃣ Create 40 Listings
    // --------------------
    const listings = [];

    for (let i = 0; i < 40; i++) {
        const place = cities[i];

        const listing = new Listing({
            title: `Cozy ${random(["Villa","Apartment","Cabin","Retreat","Resort"])} in ${place.city}`,
            description: `Enjoy a luxury stay in ${place.city} with beautiful views and premium comfort.`,
            image: {
                url: place.imageUrl,
                filename: "listingimage"
            },
            price: Math.floor(Math.random() * 10000) + 2000,
            location: place.city,
            country: place.country,
            rooms: Math.floor(Math.random() * 5) + 1,
            categories: [categoriesList[i % categoriesList.length]],
            owner: random(users)._id
        });

        await listing.save();
        listings.push(listing);
    }

    console.log("🏠 40 Listings Created");

    // --------------------
    // 3️⃣ Create 100 Reviews
    // --------------------
    const comments = [
        "Amazing stay!",
        "Very clean and comfortable.",
        "Would definitely come again.",
        "Host was very helpful.",
        "Beautiful location!",
        "Worth every penny.",
        "Super cozy place.",
        "Highly recommended!",
        "Great experience overall.",
        "Five star stay!"
    ];

    for (let i = 0; i < 100; i++) {
        const review = new Review({
            comment: random(comments),
            rating: Math.floor(Math.random() * 5) + 1,
            author: random(users)._id
        });

        await review.save();

        const listing = random(listings);
        listing.reviews.push(review._id);
        await listing.save();
    }

    console.log("⭐ 100 Reviews Created");

    console.log("🌱 Database Successfully Seeded!");
};

seedDB().then(() => {
    mongoose.connection.close();
    console.log("🔌 Connection Closed");
});