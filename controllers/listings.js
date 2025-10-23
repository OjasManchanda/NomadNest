const Listing = require("../models/listing");
const ExpressError = require("../utils/ExpressError");

// SHOW ALL LISTINGS
module.exports.index = async (req, res) => {
    const listings = await Listing.find({});
    res.render("listings/index", { listings });
};

// RENDER NEW LISTING FORM
module.exports.renderNewForm = (req, res) => {
    res.render("listings/new");
};

// CREATE NEW LISTING
module.exports.createListing = async (req, res) => {
    const listing = new Listing(req.body.listing);
    listing.owner = req.user._id; // ✅ correct variable
    await listing.save();
    console.log("New listing created:", listing);
    req.flash("success", "Successfully created a new listing!");
    res.redirect(`/listings/${listing._id}`);
};

// SHOW ONE LISTING
module.exports.showListings = async (req, res) => {
    const listing = await Listing.findById(req.params.id)
        .populate({
            path: "reviews",
            populate: { path: "author" }
        })
        .populate("owner");

    if (!listing) {
        req.flash("error", "Listing not found");
        return res.redirect("/listings");
    }

    res.render("listings/show", { listing });
};

// EDIT FORM
module.exports.editListings = async (req, res) => {
    const listing = await Listing.findById(req.params.id);
    if (!listing) throw new ExpressError(404, "Listing not found");
    res.render("listings/edit", { listing });
};

// UPDATE LISTING
module.exports.updateListings = async (req, res) => {
  const listing = await Listing.findByIdAndUpdate(req.params.id, { ...req.body.listing }, { new: true });
  req.flash("success", "Successfully updated the listing!");
  res.redirect(`/listings/${listing._id}`);
};


// DELETE LISTING
module.exports.deleteListing = async (req, res) => {
    const deletedListing = await Listing.findByIdAndDelete(req.params.id);
    if (!deletedListing) throw new ExpressError(404, "Listing not found");
    req.flash("success", "Successfully deleted the listing!");
    res.redirect("/listings");
};
