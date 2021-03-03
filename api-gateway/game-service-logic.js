//declare node dependencies
const app = require("express")();
const env = require("dotenv").config();
/*
const axios = require("axios");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

app.use(bodyParser.json());
app.use(cookieParser());

exports.gameDetails = async (req, res) => {
    const title = "Video Game Title";
  
    //axios to make HTTP request to game service
    axios
      .get(`http://${process.env.HOST}:${process.env.GAME_PORT}`, {})
      //axiosResponse: contains payload returned from game service
      .then((axiosResponse) => {
        res.cookie("authToken", axiosResponse.data.apiToken);
  
        //sends json request back to calling frontend client
        res.json(axiosResponse.data);
      })
      //catch calls errors with sending or receiving request
      .catch((axiosError) => {
        console.log(axiosError);
      });
  };
  */