//dependencies installed
const express = require("express");
const app = express.Router();
const env = require('dotenv').config();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const Review = require("../models/review");
const { Mongoose } = require("mongoose");
const mongoose = require("mongoose");
const verifyToken = require("../verifyToken"); // Used to only allow verified users to create a review.

//setup mongoDB connection
const connectionString = process.env.DB_CONNECTION;
const connector = mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Mongoose connection to Reviews MongoDB successfully established!")
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

//loadGame endpoint for accessing video game info to load reviews from database       
app.post("/load", async (req, res) => {

  console.log("Review-index receives game title from api and retrieves reviews from database.");

  //set variable for gameTitle sent in from frontend
  const gameTitle = req.body.gameTitle;
  
  //set game variable to hold returned game information
  let reviews;

  //filter reviews by game title from reviews database
  reviews = await Review.find({title: gameTitle});

  //branch executes if game not found
  if(!reviews){
    return res.json({
      success: false,
      message: "Reviews not retrieved from database.",
    })
  }

  //wraps up json packet with reviews 
  res.json({
    reviews,
    success: true,
    message: "Reviews information sucessfully retrieved from database.",
  })
})

//addReview receiving review information from frontend and saving to reviews database
// should add verifyToken middleware once we update it with the new approach.
app.post("/add", async (req, res) => {

    console.log("I made it here!");
    let title = req.body.title;
    let reviewText = req.body.reviewText;

    //title = "Stellaris";
    //reviewText = "I love this sci-fi game. It is so immersive!";

    /*
    once we verify the cookie is valid for a users token, verifyToken middleware, we need to access the database with their ID to check if they 
    want to have public reviews and to determine what the username should be.
    */

    user = "JoeJoe234";

    const review = new Review({
        title,
        reviewText,
        user
    });

    const result = await review.save();

    if(result) {
        res.json({
            success: true,
            message: "Review added!",
         });
     } else {
         res.json({
             success: false,
             message: "Review not added!",
         });
     }
 });

module.exports = app;