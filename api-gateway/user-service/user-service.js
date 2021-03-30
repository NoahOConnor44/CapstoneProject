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
const bcrypt = require("bcryptjs"); // to be used for security
const jwt = require("jsonwebtoken");
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

// Creates a new user if they dont already exist. Salts and hashes the password.
app.post("/register", async (req, res) => {
  const salt = await bcrypt.genSalt(10); // generate a salt for the password.
  const passedEmail = req.body.email;
  console.log("Request to register a user received.");

  // Check to make the raw passed data is legal before trying to access the database and save the hashed version.
  if (checkCredentials.validateCredentials(passedEmail,req.body.password))
  {
    let user = await User.find({
      email: passedEmail
    });

    // User already exists. Dont tell the front end that though. Its insecure.
    if(user.length != 0)
    {
      console.log("User already exist in database.");
      res.json({
        success: "false",
        message: "USER NOT CREATED!",
      })
    }
    else
    {
      let email = passedEmail;
      const hashPassword = await bcrypt.hash(req.body.password, salt);
      let password = hashPassword;
      const newUser = new User({
        email,
        password
      })
  
      const saveUser = await newUser.save();
  
      if(saveUser)
      {
        console.log("User created.");
        res.json({
          success: "true",
          message: "Successfully created a new user!",
        });
      }
      else
      {
        console.log("User could not be created.");
        res.json({
          success: "false",
          message: "USER NOT CREATED!",
        })
      }
    }
  }
  else
  {
    return res.json({
      success: "false",
      message: "Credentials not valid!",
      })
  }
})

// Logs in the user and generates a token and secure cookie.
app.post("/login", async (req, res) => {

  console.log("Request to login received.");
  //save information passed in from the front end.
  const passedEmail = req.body.email;
  const passedPassword = req.body.password;
  
  // Check to make sure its legal before accessing the database.
  if(checkCredentials.validateCredentials(passedEmail,passedPassword))
  {
    const user = await User.findOne({ email: passedEmail })

    // No user found with the email provided.
    console.log("User not found with email provided.");
    if(!user) {
        return res.json({
          success: "false",
          message: "NO USER FOUND!",
        })
    }

    // User found but the password doesnt match. Do not tell the front end that specifically though.
    if (!await bcrypt.compare(passedPassword, user.password))
    {
      console.log("User found but wrong credentials provided.");
      return res.json({
      success: "false",
      message: "NO USER FOUND!",
      })
    }
    // If you have a successful login, generate a token & cookie we will use to make calls to protected routes such as submitting a review, accessing user profile information, etc.
    else
    {
      //             payload = just the userID   secret key    set the token to expire in 1 day.
      const token = jwt.sign({_id: user.id}, process.env.JWTSECRETKEY, {
        expiresIn: '24h'
      });

      /*
      res.header('auth-token', token).send({
        message: "success",
        token
      });
      */
      
      // httpOnly stops script injection attacks since the front end cant access the cookie, only the backend. Since the cookie is stored on the browser. 
      // Its sent with every request so we can check to see if a jwt token exist in the cookie or if its  empty. If so they can write reviews etc.
      res.cookie('jwt', token, {
        httpOnly: true, // allows only the front end to access the cookie. Most secure practice.
        maxAge: 86400000, // cookie exist for 1 day, written in ms.
        secure: true
      });

      console.log("User logged in!");
      res.json({
        success: "True",
        message: "Logged in"
      })
    }
  }
  else
  {
    return res.json({
      success: "false",
      message: "Credentials not valid!",
      })
  }
})

app.get('/user', async (req, res) =>
{
  try 
  {
    const cookie = req.cookies['jwt'];
    const decoded = jwt.verify(cookie, process.env.JWTSECRETKEY);
    if(!decoded)
    {
      // not authenticated
      return res.status(404).send({
        message: "Unauthenticated"
      })
    }
    const user = await User.findOne({_id: decoded._id})
    const {password, ...data} = await user.toJSON();
    res.json(data); // returns the authenticated user from the database without the password.
  }
  catch (e)
  {
    // not authenticated
    return res.status(404).send({
    message: "Unauthenticated"
    })
  }
})

/*
// logout and reset the cookie for the user.
app.post('/logout', verifyToken, async (req, res) => {
  res.cookie('jwt', { maxAge: 0}) // set the cookie to expire
  res.json({
    message: "successfully logged out"
  })
})
*/

app.use(express.json); // needed to hash and salt password.

module.exports = app;