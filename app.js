// NomadNest
const express = require("express");
const app = express();
const Listing = require("./models/listing");
const path = require("path");
const mongoose = require("mongoose");
const ejsMate = require("ejs-mate");
const methodOverride = require("method-override");
app.use(methodOverride("_method")); // looks for ?_method=PUT in form action


const MONGO_URL = "mongodb://127.0.0.1:27017/nomadnest";

// Connect to MongoDB
mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("Connected to MongoDB"))
.catch(err => console.log("MongoDB connection error:", err));

// Middleware
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "public")));

// Home route
app.get("/", (req, res) => {
    res.send("Welcome to NomadNest");
});

// INDEX ROUTE - show all listings
app.get("/listings", async (req, res) => {
    try {
        const allListings = await Listing.find({});
        res.render("listings/index", { listings: allListings });
    } catch (err) {
        console.log(err);
        res.status(500).send("Database error");
    }
});

// NEW ROUTE 
app.get("/listings/new", (req, res) => {
    res.render("listings/new");
});

// EDIT ROUTE
app.get("/listings/:id/edit", async (req, res) => {
    const { id } = req.params;
    try {
        const listing = await Listing.findById(id);
        if (!listing) {
            return res.status(404).send("Listing not found");
        }
        res.render("listings/edit", { listing });
    } catch (err) {
        console.log(err);
        res.status(500).send("Database error");
    }
});

// CREATE ROUTE 
app.post("/listings", async (req, res) => {
    try {
        const listing = new Listing(req.body); // fields match schema
        await listing.save();
        res.redirect(`/listings/${listing._id}`);
        console.log("New listing created:", listing);
    } catch (err) {
        console.log(err);
        res.status(500).send("Error creating listing");
    }
});

// SHOW ROUTE
app.get("/listings/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const listing = await Listing.findById(id);
        if (!listing) {
            return res.status(404).send("Listing not found");
        }
        res.render("listings/show", { listing });
    } catch (err) {
        console.log(err);
        res.status(500).send("Database error");
    }
});

// UPDATE ROUTE
app.put("/listings/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const listing = await Listing.findById(id);

        if (!listing) {
            return res.status(404).send("Listing not found");
        }

        // Manually update fields to avoid overwriting nested objects
        listing.title = req.body.listing.title;
        listing.description = req.body.listing.description;
        listing.price = req.body.listing.price;
        listing.country = req.body.listing.country;
        listing.location = req.body.listing.location;

        // Only update image if provided
        if (req.body.listing.image?.url) {
            listing.image.url = req.body.listing.image.url;
        }

        await listing.save();
        res.redirect(`/listings/${listing._id}`);
    } catch (err) {
        console.log(err);
        res.status(500).send("Error updating listing");
    }
});


// DELETE ROUTE
app.delete("/listings/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const deletedListing = await Listing.findByIdAndDelete(id);
        if (!deletedListing) {
            return res.status(404).send("Listing not found");
        }
        res.redirect("/listings");
    } catch (err) {
        console.log(err);
        res.status(500).send("Error deleting listing");
    }
});

app.listen(8080, () => {
    console.log("Server is running on port 8080");
});
