const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = require("./userModels.js");
const Review = require("./review.js");
const { number } = require("joi");
const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  image: {
    url: String,
    filename: String,
  },
  price: Number,
  country: String,
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  location: {
    type: String,
    required: true,
  },
  coordinates: {
    type: Object,
  },
});

// Mongoose Middleware(Schema based) (Second choice)
listingSchema.post("findOneAndDelete", async (listing) => {
  if (listing) await Review.deleteMany({ _id: { $in: listing.reviews } });
});

const Listing = mongoose.model("Listing", listingSchema);

module.exports = Listing;
