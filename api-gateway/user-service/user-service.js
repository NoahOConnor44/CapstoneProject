//dependencies installed
const express = require("express");
const app = express.Router();
const env = require('dotenv').config();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const User = require("../models/user");
const { Mongoose } = require("mongoose");
const mongoose = require("mongoose");
const https = require('https');
const fs = require('fs');
let checkCredentials = require("./validateCredentials");

//setup mongoDB connection
const connectionString = process.env.DB_CONNECTION;
const connector = mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Mongoose connection to User MongoDB successfully established!")
  );

// Sets up a proxy server to listen for the api-gateway requests so it can handled here in the service
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

app.post("/register", async (req, res) => {

  console.log("Request to register a user received.");

  //save information passed in from the front end.
  const passedEmail = req.body.email;
  const passedPassword = req.body.password;

  // Check to make sure its legal before accessing the database.
  if (checkCredentials.validateCredentials(passedEmail,passedPassword))
  {
    let user = await User.find({
      email: passedEmail, 
      password: passedPassword
    });

    // User already exists. Dont tell them front end that though. Its insecure.
    if(user.length != 0)
    {
      res.json({
        success: "false",
        message: "USER NOT CREATED!",
      })
    }
    else
    {
      let email = passedEmail;
      let password = passedPassword;
      const newUser = new User({
        email,
        password
      })
  
      const saveUser = await newUser.save();
  
      if(saveUser)
      {
        res.json({
          success: "true",
          message: "Successfully created a new user!",
        });
      }
      else
      {
        res.json({
          success: "false",
          message: "USER NOT CREATED!",
        })
      }
    }
  }
})

app.post("/login", async (req, res) => {

  console.log("Request to login received.");
  //save information passed in from the front end.
  const passedEmail = req.body.email;
  const passedPassword = req.body.password;
  
  // Check to make sure its legal before accessing the database.
  if(checkCredentials.validateCredentials(passedEmail,passedPassword))
  {
    let user = await User.find({
      email: passedEmail, 
      password: passedPassword
    });

    if(user.length != 0)
    {
      res.json({
        success: "true",
        message: "Successfully found the user!",
      });
    }
    else
    {
      res.json({
        success: "false",
        message: "USER NOT CREATED!",
      })
    }
  }
})

module.exports = app;