//dependencies installed
const express = require("express");
const app = express.Router();
const env = require('dotenv').config();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const Review = require("../models/review");
const { Mongoose } = require("mongoose");
const mongoose = require("mongoose");
const verifyUserCookie = require("../verifyToken"); // Used to only allow verified users to create a review.
const User = require("../models/user");
const jwt = require("jsonwebtoken");

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
// possibly add middleware functoin back and remove the if (!decoded) block if so <---==='=
app.post("/add", async (req, res) => {

    console.log("Made it to the review service.");
    let title = req.body.title;
    let reviewText = req.body.reviewText;

   // const token = req.cookies['jwt'];
    const token = req.body.token; // testing
    const decoded = jwt.verify(token, process.env.JWTSECRETKEY);

    if(!decoded)
    {
      // User not authenticated
      return res.status(404).send({
        message: "User not authenticated."
      })
    }

    let userObj = await User.findOne({_id: decoded._id}) // Find the user based off the the id passed in the cookie.

    let user = "Anonymous";

    if(userObj.private == false)
    {
      user = userObj.username; // Change username to their actual username if they dont want to remain private
    }

    const review = new Review({
        title,
        reviewText,
        user
    });

    const result = await review.save();

    if(result) {
      console.log("Added review!");
        return res.json({
            success: true,
            message: "Review added!",
         });
     } 
     else {
      console.log("COULDNT add review!");
       return res.json({
             success: false,
             message: "Review not added!",
         });
     }
 });

module.exports = app;