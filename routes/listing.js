const express = require("express");
const router = express.Router();
const multer  = require('multer');
const { storage } = require("../cloudConfig");
const upload = multer({ storage });
const wrapAsync = require("../utils/wrapAsync");
const Listing = require("../models/listing");
const { isLoggedIn, isOwner, validateListing } = require("../middleware");

const listingController = require("../controllers/listings");


// ✅ INDEX ROUTE — show all listings
router.get("/", wrapAsync(listingController.index));


// ✅ SEARCH ROUTE — must come before /:id
router.get("/search", async (req, res) => {
  try {
    const query = req.query.q?.trim();
    let listings = [];

    if (query) {
      listings = await Listing.find({
        $or: [
          { title: { $regex: query, $options: "i" } },
          { location: { $regex: query, $options: "i" } },
          { country: { $regex: query, $options: "i" } }
        ]
      });
    } else {
      listings = await Listing.find({});
    }

    res.render("listings/index", { listings });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching search results");
  }
});


// NEW ROUTE — form to create a new listing
router.get("/new", isLoggedIn, listingController.renderNewForm);


// CREATE ROUTE — actually create the listing
router.post(
  "/", 
  isLoggedIn, 
  upload.single("listing[image]"), 
  validateListing, 
  wrapAsync(listingController.createListing)
);


// SHOW ROUTE — show one listing
router.get("/:id", wrapAsync(listingController.showListings));


// EDIT ROUTE — show edit form
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingController.editListings));


// UPDATE ROUTE — handle edit form submission
router.put(
  "/:id",
  isLoggedIn,
  isOwner,
  upload.single("listing[image]"),
  validateListing,
  wrapAsync(listingController.updateListings)
);


// DELETE ROUTE — remove a listing
router.delete("/:id", isLoggedIn, isOwner, wrapAsync(listingController.deleteListing));


module.exports = router;
