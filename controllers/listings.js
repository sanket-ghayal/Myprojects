const Listing = require("../models/listing.js");

// =====================
// INDEX + CATEGORY FILTER
// =====================
module.exports.index = async (req, res) => {
    const { category } = req.query;

    let allListings;

    if (category && category !== "all") {
        allListings = await Listing.find({ category });
    } else {
        allListings = await Listing.find({});
    }

    res.render("listings/index.ejs", {
        allListings,
        category,
        query: null
    });
};

// =====================
// RENDER NEW LISTING FORM
// =====================
module.exports.renderNewForm = (req, res) => {
    res.render("listings/new.ejs");
};

// =====================
// SHOW SINGLE LISTING
// =====================
module.exports.showListing = async (req, res) => {
    const id = req.params.id.trim();

    const listing = await Listing.findById(id)
        .populate({
            path: "reviews",
            populate: { path: "author" },
        })
        .populate("owner");

    if (!listing) {
        req.flash("error", "Listing you requested for does not exist!");
        return res.redirect("/listings");
    }

    res.render("listings/show.ejs", { listing });
};

// =====================
// CREATE LISTING (FLAT FIELDS)
// =====================
module.exports.createListing = async (req, res) => {
    const { title, description, price, location, country, category } = req.body;

    const newListing = new Listing({
        title,
        description,
        price,
        location,
        country,
        category,
        owner: req.user._id
    });

    if (req.file) {
        newListing.image = {
            url: req.file.path,
            filename: req.file.filename,
        };
    }

    await newListing.save();
    req.flash("success", "New Listing Created!");
    res.redirect("/listings");
};

// =====================
// EDIT FORM
// =====================
module.exports.renderEditForm = async (req, res) => {
    const { id } = req.params;

    const listing = await Listing.findById(id);
    if (!listing) {
        req.flash("error", "Listing you requested for does not exist!");
        return res.redirect("/listings");
    }

    const originalImageUrl = listing.image?.url?.replace("/upload", "/upload/w_250");

    res.render("listings/edit.ejs", { listing, originalImageUrl });
};

// =====================
// UPDATE LISTING (FLAT FIELDS)
// =====================
module.exports.updateListing = async (req, res) => {
    const { id } = req.params;
    const { title, description, price, location, country, category } = req.body;

    const listing = await Listing.findByIdAndUpdate(id, {
        title,
        description,
        price,
        location,
        country,
        category
    }, { new: true });

    if (req.file) {
        listing.image = {
            url: req.file.path,
            filename: req.file.filename,
        };
        await listing.save();
    }

    req.flash("success", "Listing Updated!");
    res.redirect(`/listings/${id}`);
};

// =====================
// DELETE LISTING
// =====================
module.exports.deleteListing = async (req, res) => {
    const { id } = req.params;

    await Listing.findByIdAndDelete(id);

    req.flash("success", "Listing Deleted!");
    res.redirect("/listings");
};

// =====================
// SEARCH LISTINGS
// =====================
module.exports.searchListings = async (req, res) => {
    const query = req.query.q?.trim();

    let allListings;

    if (!query) {
        allListings = await Listing.find({});
    } else {
        allListings = await Listing.find({
            $or: [
                { title: { $regex: query, $options: "i" } },
                { location: { $regex: query, $options: "i" } },
            ],
        });
    }

    res.render("listings/index.ejs", { allListings, query, category: null });
};
