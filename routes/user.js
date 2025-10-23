const express = require("express");
const router = express.Router({ mergeParams: true });
const User = require("../models/user");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { savedRedirectUrl } = require("../middleware");

const users = require("../controllers/users");


router.get("/signup", (users.renderSignupForm));
router.post("/signup", wrapAsync(users.signupUser));

router.get("/login", (users.renderLoginForm));

router.post(
    "/login", savedRedirectUrl,
    passport.authenticate("local", {
        failureRedirect: "/login",
        failureFlash: true
    }),
    (users.loginUser)
);
router.get("/logout", (users.logoutUser ));
//ojas27
//123
module.exports = router;