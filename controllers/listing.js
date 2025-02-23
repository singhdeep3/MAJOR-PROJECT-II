const Listing = require("../models/listing");
const API_key = "b940bfeda42b11f5d7557ad0be06ef50";

module.exports.index = async (req, res) => {
  const allListings = await Listing.find({});
  res.render("./listings/index.ejs", { allListings });
};

module.exports.renderNewForm = async (req, res) => {
  res.render("./listings/new.ejs");
};

module.exports.showListings = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id)
    .populate({
      path: "reviews",
      populate: {
        path: "author",
      },
    })
    .populate("owner");
  if (!listing) {
    req.flash("error", "Listing does not existed!");
    res.redirect("/listings");
  }
  res.render("./listings/show.ejs", { listing });
};

module.exports.createListing = async (req, res, next) => {
  // let {title,description,image,price,country,location} = req.body;
  // let listing  = req.body.listing;
  // if(!req.body.listing){
  //   throw new ExpressError(400,"Please Enter Valid data!");
  // }
  let url = req.file.path;
  let filename = req.file.filename;
  const newListing = new Listing(req.body.listing);
  newListing.owner = req.user._id;
  newListing.image = { url, filename };
  //  for(let i = newListing.location.length - 1;i >= 0;i--){

  //   }
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${newListing.location}&appid=${API_key}&units=metric`
  );
  const data = await response.json();
  let coordinates = data.coord;
  newListing.coordinates = coordinates;
  await newListing.save();
  req.flash("success", "New Listing Added!");
  res.redirect("/listings");
};

module.exports.renderEditForm = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  if (!listing) {
    req.flash("error", "Listing does not existed!");
    res.redirect("/listings");
  }
  res.render("./listings/edit.ejs", { listing });
};

module.exports.updateListing = async (req, res) => {
  if (!req.body.listing) {
    throw new ExpressError(400, "Please Enter Valid data!");
  }
  let { id } = req.params;

  let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });

  if (typeof req.file !== "undefined") {
    let url = req.file.path;
    let filename = req.file.filename;
    listing.image = { url, filename };
    await listing.save();
  }

  req.flash("success", "Listing Updated!");
  res.redirect(`/listings/${id}`);
};

module.exports.destroyListing = async (req, res) => {
  let { id } = req.params;
  let listing = await Listing.findById(id);
  // One Approach below and second approach is to use MOngoose Middelwares
  // await Review.deleteMany({_id:{$in:listing.reviews}});
  let deletedlisting = await Listing.findByIdAndDelete(id);
  req.flash("success", "Listing got deleted!");
  res.redirect("/listings");
};
