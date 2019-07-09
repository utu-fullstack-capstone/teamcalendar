const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function(req, res, next) {
<<<<<<< HEAD
  // Get jws token from header
  const token = req.header('x-auth-token');

  // check for token
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }
  // verfiy token
  try {
    const decoded = jwt.verify(token, config.get('jwtSecret'));

    req.user = decoded.user;
    next();
  } catch (error) {
    res.status(401).json({ msg: 'No token, autorization denied' });
=======
  const token = req.header('x-auth-token');

  if (!token) {
    return res.status(401).json({ msg: 'Access denied, no token' });
  }

  // Verifying token
  try {
    const decoded = jwt.verify(token, config.get('jwtSecret'));
    req.user = decoded.user;
    next();
  } catch (err) {
    // Error messages in situations where token is expired or token is not valid.
    if (err.name == 'TokenExpiredError') {
      res.status(401).json({ msg: 'Access denied. Token is expired.' });
    }
    res.status(401).json({ msg: 'Access denied, no valid token' });
>>>>>>> origin/dev
  }
};
