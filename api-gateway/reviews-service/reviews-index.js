//dependencies installed
const express = require("express");
const app = express.Router();
const env = require('dotenv').config();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const Review = require("../models/review");
const { Mongoose } = require("mongoose");
const mongoose = require("mongoose");

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

//addReview receiving review information from frontend and saving to reviews database       +todo: pull out title,reviewText,user from the request.
app.post("/add", async (req, res) => {

    console.log("I made it here!");

    title = "Stellaris";
    reviewText = "I love this sci-fi game. It is so immersive!";
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