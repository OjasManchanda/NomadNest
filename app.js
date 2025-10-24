if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}



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
const cookieParser = require("cookie-parser");
const connectFlash = require("connect-flash");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user");

// Importing Routes
const reviewsRoutes = require("./routes/review");
const listingsRoutes = require("./routes/listing");
const userRoutes = require("./routes/user");

app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());


const MONGO_URL = "mongodb://127.0.0.1:27017/nomadnest";

// Connect to MongoDB
mongoose.connect(MONGO_URL)
    .then(() => console.log(" Connected to MongoDB"))
    .catch(err => console.log(" MongoDB connection error:", err));

// Home route
app.get("/", (req, res) => {
    res.send("Welcome to NomadNest");
});

const sessionOptions = {
    secret: "mysupersecretcode",
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true,
    }
}

app.use(session(sessionOptions));
app.use(connectFlash());

app.use(passport.initialize());
app.use(passport.session());//to know which user is logged in
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());//to store user in session
passport.deserializeUser(User.deserializeUser());//to remove user from session

app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
    next();
});


// app.get("/demoUser", async (req, res) => {
//     const user = new User({ 
//         email: "ojas.manchanda06@gmail.com",
//         username: "ojasmanchanda",
//     });

//     let registeredUser = await User.register(user, "helloworld");
//     res.send(registeredUser);
// });











//------------------------------LISTINGS----------------------------------------
app.use("/listings", listingsRoutes);

//-------------------------------REVIEWS----------------------------------------
app.use("/listings/:id/reviews", reviewsRoutes);

app.use("/", userRoutes);

// 404 Handler
app.all(/.*/, (req, res, next) => {
    next(new ExpressError(404, "Page Not Found"));
});

// Global Error Handling Middleware
app.use((err, req, res, next) => {
    const { statusCode = 500, message = "Something went wrong!" } = err;
    console.log("Error caught by middleware:", err); // debug
    res.status(statusCode).send(`<h1>Error ${statusCode}</h1><p>${message}</p>`);
});

app.listen(8080, () => {
    console.log(" Server running on port 8080");
});
