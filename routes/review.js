const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utili/wrapAsync.js");
const ExpressError = require("../utili/ExpressError");
const { reviewSchema } = require("../schema.js");
const Review = require("../models/review.js");
const Listing = require("../models/listing.js");
const { validateReview , isLoggedIn, isReviewAuthor} = require("../middleware.js");

const reviewController = require("../controllers/reviews.js");

// Review Route
router.post("/",isLoggedIn, validateReview, wrapAsync(reviewController.createReview));

// Delete route
router.delete("/:reviewId",isLoggedIn,isReviewAuthor, wrapAsync(reviewController.deleteReview));

module.exports = router;