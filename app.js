// NomadNest
const express = require("express");
const app = express();
const Listing = require("./models/listing");
const path = require("path");
const mongoose = require("mongoose");
const ejsMate = require("ejs-mate");
const wrapAsync = require("./utils/wrapAsync");
const ExpressError = require("./utils/ExpressError");
const methodOverride = require("method-override");
const { listingSchema, reviewSchema } = require("./schema");
const Review = require("./models/review");

app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

const MONGO_URL = "mongodb://127.0.0.1:27017/nomadnest";

// Connect to MongoDB
mongoose.connect(MONGO_URL)
    .then(() => console.log(" Connected to MongoDB"))
    .catch(err => console.log(" MongoDB connection error:", err));

// Home route
app.get("/", (req, res) => {
    res.send("Welcome to NomadNest");
});

const validateListing = (req, res, next) => {
    // validate incoming data using Joi schema
    const { error } = listingSchema.validate(req.body); // change to reviewSchema if needed

    if (error) {
        // map all error messages into a single string
        const errMsg = error.details.map(el => el.message).join(",");
        // throw a custom ExpressError
        throw new ExpressError(400, errMsg);
    } else {
        // continue to next middleware or route handler
        next();
    }
};
const validateReview = (req, res, next) => {
    // validate incoming data using Joi schema
    const { error } = reviewSchema.validate(req.body); // change to reviewSchema if needed

    if (error) {
        // map all error messages into a single string
        const errMsg = error.details.map(el => el.message).join(",");
        // throw a custom ExpressError
        throw new ExpressError(400, errMsg);
    } else {
        // continue to next middleware or route handler
        next();
    }
};
// INDEX ROUTE - show all listings
app.get("/listings", wrapAsync(async (req, res) => {
    const listings = await Listing.find({});
    res.render("listings/index", { listings });
}));

// NEW ROUTE
app.get("/listings/new", (req, res) => {
    res.render("listings/new");
});

// CREATE ROUTE
app.post("/listings", wrapAsync(async (req, res, next) => {
    let result = listingSchema.validate(req.body);
    console.log(result);
    if (!req.error) {
        throw new ExpressError(400, result.error);
    }
    const listing = new Listing(req.body.listing);
    await listing.save();
    console.log("New listing created:", listing);
    res.redirect(`/listings/${listing._id}`);
}));

// SHOW ROUTE
app.get("/listings/:id", wrapAsync(async (req, res, next) => {
    const listing = await Listing.findById(req.params.id).populate("reviews");
    if (!listing) throw new ExpressError(404, "Listing not found");
    res.render("listings/show", { listing });
}));

// EDIT ROUTE
app.get("/listings/:id/edit", wrapAsync(async (req, res, next) => {
    const listing = await Listing.findById(req.params.id);
    if (!listing) throw new ExpressError(404, "Listing not found");
    res.render("listings/edit", { listing });
}));

// UPDATE ROUTE
app.put("/listings/:id", wrapAsync(async (req, res, next) => {
    const { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) throw new ExpressError(404, "Listing not found");

    const updatedData = req.body.listing;
    if (!updatedData) throw new ExpressError(400, "Invalid update data");

    listing.title = updatedData.title;
    listing.description = updatedData.description;
    listing.price = updatedData.price;
    listing.country = updatedData.country;
    listing.location = updatedData.location;
    if (updatedData.image?.url) listing.image.url = updatedData.image.url;

    await listing.save();
    res.redirect(`/listings/${listing._id}`);
}));

// DELETE ROUTE
app.delete("/listings/:id", wrapAsync(async (req, res, next) => {
    const deletedListing = await Listing.findByIdAndDelete(req.params.id);
    if (!deletedListing) throw new ExpressError(404, "Listing not found");
    res.redirect("/listings");
}));

//-------------------------------REVIEWS----------------------------------------
//POST ROUTE
app.post("/listings/:id/reviews", validateReview, wrapAsync(async (req, res) => {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
        throw new ExpressError(404, "Listing not found");
    }

    const review = new Review(req.body.review);
    await review.save();

    listing.reviews.push(review);
    await listing.save();

    res.redirect(`/listings/${listing._id}`); // redirects back to the listing page
}));
//DELETE REVIEW ROUTE
app.delete("/listings/:id/reviews/:reviewId", wrapAsync(async (req, res) => {
    const { id, reviewId } = req.params;
    // Remove the reference from Listing.reviews array
    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    // Delete the actual review document
    await Review.findByIdAndDelete(reviewId);
    res.redirect(`/listings/${id}`);
}));


// 404 Handler
app.all(/.*/, (req, res, next) => {
    next(new ExpressError(404, "Page Not Found"));
});

// Global Error Handling Middleware
app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    if (!err.message) err.message = "Something went wrong!";
    res.status(statusCode).render("error", { err });
});

app.listen(8080, () => {
    console.log(" Server running on port 8080");
});
