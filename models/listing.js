const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Review = require('./review');

const listingSchema = new Schema({  
    title: { type: String, required: true },
    description: String,
    image: {
        filename: { type: String, default: "listingimage" },
        url: { 
            type: String, 
            default: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=1171",
            set: v => v === "" ? "https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=1171" : v
        }
    },
    price: Number,
    location: String,
    country: String,
    rooms: Number,                 // number of rooms
    categories: [{ type: String }], // array of categories
    reviews: [{ type: Schema.Types.ObjectId, ref: 'Review' }],
    owner: { type: Schema.Types.ObjectId, ref: 'User' }
});

// Delete all associated reviews when a listing is deleted
listingSchema.post("findOneAndDelete", async function(doc) {
    if (doc) {
        await Review.deleteMany({ _id: { $in: doc.reviews } });
    }
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;  // <-- MAKE SURE THIS LINE EXISTS
