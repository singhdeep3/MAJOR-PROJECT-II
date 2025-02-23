const express = require("express");
const { listingSchema } = require("../schema.js");
const router = express.Router({ mergeParams: true });
const Listing = require("../models/listing.js");
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const controllerListing = require("../controllers/listing.js");
const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });

router
  .route("/")
  .get(wrapAsync(controllerListing.index))
  .post(
    isLoggedIn,
    validateListing,
    upload.single("listing[image]"),
    wrapAsync(controllerListing.createListing)
  );

router.route("/new").get(isLoggedIn, controllerListing.renderNewForm);

router
  .route("/:id")
  .get(wrapAsync(controllerListing.showListings))
  .put(
    isLoggedIn,
    isOwner,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(controllerListing.updateListing)
  )
  .delete(isLoggedIn, isOwner, wrapAsync(controllerListing.destroyListing));

//Edit Route
router
  .route("/:id/edit")
  .get(isLoggedIn, isOwner, wrapAsync(controllerListing.renderEditForm));

module.exports = router;
