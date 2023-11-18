const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }
  jwt.verify(token.split(' ')[1], 'yHECxIfHTu', (err, decoded) => {
    if (err) {
      console.error('Error decoding token:', err);
      return res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }    
    req.userId = decoded.userId;
    next();
  });
};

module.exports = verifyToken;
