/*
This will likely have to be changed a bit. I was trying multiple implementations and this is left over. Still think it will be useful
with checking the cookie passed from the user on each request when accessing protected routes just needs some tweaking since
I am no longer sending an auth-token in the header of each request.
*/

// middleware function for routes we want to be protected.
function verifyToken(req, res, next) {
    const token = req.header('auth-token');
  
    if(!token) 
    {
      return res.status(401).send('Access Denied')
    }
    try 
    {
      const verified = jwt.verify(token, process.env.JWTSECRETKEY);
      req.user = verified;
      next(); // go to the next middleware
    }
    catch (err)
    {
      res.status(400).send('Invalid Token');
    }
}

module.exports = verifyToken;