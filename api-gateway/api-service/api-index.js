//declare necessary dependencies
const express = require("express");
const app = express();
const env = require("dotenv").config();
const https = require('https');
const fs = require('fs');
let gameService = require("../game-service/game-index");
let reviewsService = require("../reviews-service/reviews-index");
let userService = require("../user-service/user-service");
const cors = require('cors');
const cookieParser = require('cookie-parser');

app.use(cors ({
  credentials: true, // ensures the cookie is retrieved at the front end. Can be seen in inspect element, application, cookies.
  origin: ['https://localhost:4200'] // port for the front end angular recon client: 4200
})); 

app.use(cookieParser()); // allows routes to get cookies for user authentication
app.use(express.json()); // needed to pass jwt objects as json

app.use('/game', gameService);
app.use('/review', reviewsService);
app.use('/user',userService);

//create HTTPS server to listen on the port for the API Gateway
const httpsServer = https.createServer({
  key: fs.readFileSync('ssl/cakey.key'),
  cert: fs.readFileSync('ssl/cacert.crt'),
}, app);

httpsServer.listen(process.env.API_PORT, () => {
  console.log(`HTTPS Server running on port ${process.env.API_PORT}`);
});

