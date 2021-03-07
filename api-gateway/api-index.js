//declare necessary dependencies
const express = require("express");
const app = express();
const env = require("dotenv").config();
const { createProxyMiddleware } = require('http-proxy-middleware');
//let gameService = require("./game-service-logic");

//utilizes http-proxy-middleware (HPM) to forward request from the api to the correct services on different ports 
let gameServiceTarget = `http://${process.env.HOST}:${process.env.GAME_PORT}/`;

// Takes a request made from client to localhost:4000/loadGame and forwards it to localhost:2468/
app.use('/loadGame', createProxyMiddleware({
    // Target is where we want to forward the request to
    target: gameServiceTarget,
    headers: {
        accept: "application/json",
        method: "POST"
      },
    changeOrigin: true,
}));

// Opens the port for the gateway and listens for incoming requests to forward to individual services.
app.listen(process.env.API_PORT, () =>  { 
    console.log(`API-Gateway listening on port ${process.env.API_PORT}`); 
});


/* 
app.get("/api/loadGame", async (req, res) => {
  gameService.getGameDetails(req, res);
});
*/