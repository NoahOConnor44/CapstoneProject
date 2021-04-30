const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const User = require("./models/user");

async function verifyUserCookie(req, res, next) {
  try 
  {
    const cookie = req.cookies['jwt'];
    const decoded = jwt.verify(cookie, process.env.JWTSECRETKEY);

    if(!decoded)
    {
      // User not authenticated
      return res.status(404).send({
        message: "User not authenticated."
      })
    }
    // User token passed authentication
      console.log("JWT verified successfully checking for a user with the provided ID");
      const user = await User.findOne({_id: decoded._id})
      const {password, ...data} = await user.toJSON(); // removes the users password from the payload.
      // res.json(data); // Do not return data yet, the backend service will. Just add the data to the response so it can be accessed by the service.

      next(); // lets the next middleware function or backend service run
  }
  catch (e)
  {
    // User token failed verification
    return res.status(404).send({
    message: "User not authenticated."
    })
  }
}

module.exports = verifyUserCookie;