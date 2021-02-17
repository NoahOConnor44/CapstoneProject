const mongoose = require("mongoose");

const GameSchema = new mongoose.Schema({
  title: { type: String, default: "Video Game Title" },
  description: { type: String, default: "Video Game Description" },
  genre: { type: String, default: "Video Game Genre" },
  coop: { type: Boolean, default: false },
  consoleType: { type: String, default: "Game Console Availability" },
  negativeRating: { type: Number, default: 0 },
  positiveRating: { type: Number, default: 0 },
  reviews: { type: String, default: "Video Game Reviews" },
  recommendations: [mongoose.Schema.Types.Mixed],
});

const Game = mongoose.model("Game", GameSchema);

module.exports = Game;