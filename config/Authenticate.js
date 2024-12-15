const jwt = require('jsonwebtoken');  
const authenticateJWT = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(403).json({ message: 'Access denied, token missing.' });
  }
  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Unauthorized access, invalid token.' });
    }
    
    req.user = decoded;
    next(); 
  });
};

module.exports = { authenticateJWT };
