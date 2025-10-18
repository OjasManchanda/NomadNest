// routes/review.js
const express = require("express");
const router = express.Router({ mergeParams: true });
const Review = require("../models/review");
const Listing = require("../models/listing");
const { reviewSchema } = require("../schema");
const ExpressError = require("../utils/ExpressError");
const wrapAsync = require("../utils/wrapAsync");

// --------------------- MIDDLEWARE ---------------------
const validateReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body);
    if (error) {
        const errMsg = error.details.map(el => el.message).join(",");
        throw new ExpressError(400, errMsg);
    }
    next();
};

// --------------------- ROUTES -------------------------

// CREATE REVIEW — POST /listings/:id/reviews
router.post("/", validateReview, wrapAsync(async (req, res) => {
    const listing = await Listing.findById(req.params.id);
    if (!listing) throw new ExpressError(404, "Listing not found");

    const review = new Review(req.body.review);
    await review.save();

    listing.reviews.push(review);
    await listing.save();
    req.flash("success", "Successfully created a new review!");
    res.redirect(`/listings/${listing._id}`);
}));

// DELETE REVIEW — DELETE /listings/:id/reviews/:reviewId
router.delete("/:reviewId", wrapAsync(async (req, res) => {
    const { id, reviewId } = req.params;
    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    req.flash("success", "Successfully deleted a review!");
    res.redirect(`/listings/${id}`);
}));

module.exports = router;
