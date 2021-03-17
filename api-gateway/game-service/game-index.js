//dependencies installed
const express = require("express");
const app = express.Router();
const env = require('dotenv').config();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const Game = require("../models/game");
const { Mongoose } = require("mongoose");
const mongoose = require("mongoose");
const https = require('https');
const fs = require('fs');

//setup mongoDB connection
const connectionString = process.env.DB_CONNECTION;
const connector = mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Mongoose connection to Games MongoDB successfully established!")
  );

// Sets up a proxy server to listen for the api-gateway requests so it can handled here in the service here
var http = require('http');
server = http.createServer(function (req, res) {
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.write('Proxy Request was Successful!' + '\n' + JSON.stringify(req.headers, true, 2));
      console.log('Proxy Request was Successful!' + '\n' + JSON.stringify(req.headers, true, 2));
      res.end();
});

//allow usage of parser packages
app.use(bodyParser.json());
app.use(cookieParser());

mongoose.Promise = Promise;

//loadGame endpoint for accessing video game info                + to do: reach out to DB again to find games within the searched genre for recommendations, return 3 with similair ratings.
app.post("/load", async (req, res) => {

  console.log("Game-index receives game title from api and retrieves info from database.");

  //set variable for gameTitle sent in from frontend
  const gameTitle = req.body.gameTitle;
  
  //set game variable to hold returned game information
  let game;

  //find game in database using title
  game = await Game.findOne({title: gameTitle});
  
  // store rating for the search game to find recommendations, set up the game rating range.
  let searchedGenre = game.genre;
  let searchedTitle = game.title;
  let rating = game.positiveRating;
  let maxRating = rating + 12;
  if(maxRating > 100) maxRating = 100
  let minRating = rating - 4;

  // finds any games in the database that are less than the maxRating but more than the minRating with the desired genre, sorts them by closest rating, makes sure the same title isnt returned.
  let gameRecommendations = await Game.find({
    genre: searchedGenre, 
    positiveRating : { $lte : Number(maxRating), $gte : Number(minRating) },
    title: { $ne : gameTitle}
  }).sort( {positiveRating: 'asc'} ).exec();

  //branch executes if game not found
  if(!game){
    return res.json({
      success: false,
      message: "Game information not retrieved from database.",
    })
  }

  //wraps up json packet with game information and the recommendations to send them back to the api 
  res.json({
    game,
    gameRecommendations,
    success: true,
    message: "Game information sucessfully retrieved from database.",
  })
})

// //test schema
// app.get("/addGame", async (req, res) => {
//     title = "Pummel Party";
//     description = "Pummel Party is a 4-8 player online and local-multiplayer party game. Pummel friends or AI using a wide array of absurd items in the board mode and compete to destroy friendships in the unique collection of minigames.";
//     genre = "Casual";
//     coop = true;
//     consoleType = "3";
//     negativeRating = 9;
//     positiveRating = 91;
//     reviews = "Video Game Reviews";
//     recommendations = "Test";

//     const game = new Game({
//         title,
//         description,
//         genre,
//         coop,
//         consoleType,
//         negativeRating,
//         positiveRating,
//         reviews,
//         recommendations
//     });

//     const result = await game.save();

//     if(result) {
//         res.json({
//             success: true,
//             message: "Game added!",
//         });
//     } else {
//         res.json({
//             success: false,
//             message: "Game not added!",
//         });
//     }
// });

//declare port 
// app.listen(process.env.GAME_PORT, () =>  { 
//     console.log(`Game server listening on port ${process.env.GAME_PORT}`); 
// });

module.exports = app;