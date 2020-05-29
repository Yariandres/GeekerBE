const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function(req, res, next) {

  // GET token from header
  const token = req.header('x-auth-token');

  // Check if no token is and route is protected
  if(!token ) {
    return res.status(401).json({ msg: 'No token, authorization denied'});
  }

  try {

    // Verify token 
    const decoded = jwt.verify(token, config.get('jwtSecret'));

    // Assign a value to dev
    req.dev = decoded.dev;

    next();

  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
}





