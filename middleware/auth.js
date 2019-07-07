const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function(req, res, next) {
  // Get jws token from header
  const token = req.header('x-auth-token');

  // check for token
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }
  // verfiy token
  try {
    const decoded = jwt.verify(token, config.get('jwtSecret'));

    req.teamName = decoded.team;
    next();
  } catch (error) {
    res.status(401).json({ msg: 'No token, autorization denied' });
  }
};
