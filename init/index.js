const mongoose = require("mongoose");
const data = require("./data.js");
const Listing = require("../models/listing.js");
const MONGO_URL = "mongodb://127.0.0.1:27017/Ghumi_Ghumi";

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
  await Listing.deleteMany({});
  data.data = data.data.map((obj) => ({
    ...obj,
    owner: "67b314bfd7da80f779f213bb",
  }));
  await Listing.insertMany(data.data);
  console.log("Data is saved ");
};

initDB();
