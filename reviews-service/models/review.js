const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema({
  title: { type: String, default: "Video Game Title" },
  reviewText: { type: String, default: "Video Game Review" },
  user: { type: String, default: "Username" },
  
});

const Review = mongoose.model("Review", ReviewSchema);

module.exports = Review;