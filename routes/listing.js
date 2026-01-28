const express = require("express");
const router = express.Router();
const wrapAsync = require("../utili/wrapAsync.js");
const Listing = require("../models/listing.js");
const { isLoggedIn, validateListing, isOwner } = require("../middleware.js");
const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });

const listingController = require("../controllers/listings.js");

// ===================================
// ROUTE: LISTINGS INDEX (with category filter)
// ===================================
router.get("/", async (req, res) => {
  const { category } = req.query;

  let allListings;
  if (category && category !== "all") {
    allListings = await Listing.find({ category });
  } else {
    allListings = await Listing.find({});
  }

  res.render("listings/index", { allListings, category });
});

// ===================================
// ROUTE: CREATE NEW LISTING
// ===================================
router.post(
  "/",
  isLoggedIn,
  upload.single("image"),  // <-- MATCHS flattened form field
  wrapAsync(listingController.createListing)
);

// ===================================
// ROUTE: NEW FORM
// ===================================
router.get("/new", isLoggedIn, listingController.renderNewForm);

// ===================================
// ROUTE: SEARCH
// ===================================
router.get("/search", wrapAsync(listingController.searchListings));

// ===================================
// ROUTE: SHOW / UPDATE / DELETE
// ===================================
router
  .route("/:id")
  .get(wrapAsync(listingController.showListing))
  .put(
    isLoggedIn,
    isOwner,
    upload.single("image"), // <-- MATCHS flattened form field
    wrapAsync(listingController.updateListing)
  )
  .delete(isLoggedIn, isOwner, wrapAsync(listingController.deleteListing));

// ===================================
// ROUTE: EDIT FORM
// ===================================
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingController.renderEditForm));

module.exports = router;
