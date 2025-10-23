const express = require("express");
const router = express.Router();

const wrapAsync = require("../utils/wrapAsync");
const Listing = require("../models/listing");
const {isLoggedIn, isOwner, validateListing} = require("../middleware")


// INDEX ROUTE — show all listings
router.get("/", wrapAsync(async (req, res) => {
    const listings = await Listing.find({});
    res.render("listings/index", { listings });
}));

// NEW ROUTE — form to create a new listing
router.get("/new", isLoggedIn, (req, res) => {
    res.render("listings/new");
});

// CREATE ROUTE — actually create the listing
router.post("/", validateListing, isLoggedIn,wrapAsync(async (req, res) => {
    const listing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    await listing.save();
    console.log("New listing created:", listing);
    req.flash("success", "Successfully created a new listing!");
    res.redirect(`/listings`);
}));

// SHOW ROUTE — show one listing
router.get("/:id", wrapAsync(async (req, res) => {
    const listing = await Listing.findById(req.params.id)
    .populate({
        path: "reviews",
        populate: { path: "author" }  // nested populate for review authors
    })
    .populate("owner");  // populate the listing owner

    if (!listing) {
        req.flash("error", "Listing not found");
        res.redirect("/listings");
    }
    res.render("listings/show", { listing });
}));

// EDIT ROUTE — show edit form
router.get("/:id/edit", isLoggedIn,isOwner,wrapAsync(async (req, res) => {
    const listing = await Listing.findById(req.params.id);
    if (!listing) throw new ExpressError(404, "Listing not found");
    res.render("listings/edit", { listing });
}));

// UPDATE ROUTE — handle edit form submission
router.put("/:id", validateListing, isLoggedIn,isOwner, wrapAsync(async (req, res) => {
    
    if (!listing) throw new ExpressError(404, "Listing not found");

    // update basic fields
    listing.title = req.body.listing.title;
    listing.description = req.body.listing.description;
    listing.price = req.body.listing.price;
    listing.location = req.body.listing.location;
    listing.country = req.body.listing.country;

    // check if a new image was submitted
    if (req.body.listing.image && req.body.listing.image.url) {
        listing.image = req.body.listing.image; // replace only if new image provided
    }

    await listing.save();
    req.flash("success", "Successfully updated a listing!");
    res.redirect(`/listings/${listing._id}`);
}));

// DELETE ROUTE — remove a listing
router.delete("/:id", isLoggedIn,isOwner, wrapAsync(async (req, res) => {
    const deletedListing = await Listing.findByIdAndDelete(req.params.id);

    if (!deletedListing) throw new ExpressError(404, "Listing not found");
    req.flash("success", "Successfully deleted a listing!");
    res.redirect("/listings");
}));

module.exports = router;
