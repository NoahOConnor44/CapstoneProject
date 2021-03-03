//declare necessary dependencies
const express = require("express");
const app = require("express")();
const env = require("dotenv").config();
const { createProxyMiddleware } = require('http-proxy-middleware');
//let gameService = require("./game-service-logic");

//utilizing HPM to forward request from loadGame 
app.use("/loadGame", createProxyMiddleware({
    //corresponding target endpoint server URL
    target: `http://${process.env.HOST}:${process.env.GAME_PORT}/`,
    
    headers: {
      accept: "application/json",
      method: "GET"
    },
    changeOrigin: true 
}));

//declare port
app.listen(process.env.API_PORT, () =>  { 
    console.log(`API-Gateway listening on port ${process.env.API_PORT}`); 
});


/* 
app.use(bodyParser.json());
app.use(cookieParser());

app.get("/api/loadGame", async (req, res) => {
  gameService.getGameDetails(req, res);
});


.get("/api/user", (req, res) => {
        User.find()
            .then((Users) => {

                // Log response with log-service
                let log = {
                    service: "User",
                    route: "/api/user",
                    responseId: res.getHeader(`x-request-id`),
                    message: "responding with all users",
                    date: Date.now
                }
                // Send log to log controller
                logger.logResponse(log);

                res.json(Users);
            })
            .catch((err) => {
                res.json(err.message);
            });
    })

*/