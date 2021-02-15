//dependencies installed
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const Game = require("./models/game");
const { Mongoose } = require("mongoose");
const mongoose = require("mongoose");

//setup mongoDB connection
const connectionString = "mongodb+srv://r3c0n_Admin:k9UffpioKi1DFV7P@cluster0.9gz5z.mongodb.net/angulardb?retryWrites=true&w=majority";
const connector = mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Mongoose connection to Games MongoDB successfully established!")
  );

//allow usage of parser packages
app.use(bodyParser.json());
app.use(cookieParser());

mongoose.Promise = Promise;

//test get request
app.get("/", (req, res) => res.send("Testing game-index.js!"));

//test schema
app.get("/addGame", async (req, res) => {
    title = "Video Game Title";
    description = "Video Game Description";
    genre = "Video Game Genre";
    coop = false;
    consoleType = "Game Console Availability";
    negativeRating = 0;
    positiveRating = 0;
    reviews = "Video Game Reviews";
    recommendations = "Test";

    const game = new Game({
        title,
        description,
        genre,
        coop,
        consoleType,
        negativeRating,
        positiveRating,
        reviews,
        recommendations
    });

    const result = await game.save();

    if(result) {
        res.json({
            success: true,
            message: "Game added!",
        });
    } else {
        res.json({
            success: false,
            message: "Game not added!",
        });
    }
});

//declare port 
app.listen(2468, () => console.log("Game server listening at 2468."));