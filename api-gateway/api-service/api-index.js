//declare necessary dependencies
const express = require("express");
const app = express();
const env = require("dotenv").config();
const https = require('https');
const fs = require('fs');
let gameService = require("../game-service/game-index");
let reviewsService = require("../reviews-service/reviews-index");

app.use('/game', gameService);

app.use('/review', reviewsService);

//create HTTPS server to listen on the port for the API Gateway
const httpsServer = https.createServer({
  key: fs.readFileSync('ssl/cakey.key'),
  cert: fs.readFileSync('ssl/cacert.crt'),
}, app);

httpsServer.listen(process.env.API_PORT, () => {
  console.log(`HTTPS Server running on port ${process.env.API_PORT}`);
});

