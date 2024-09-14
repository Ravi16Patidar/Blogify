import jwt from 'jsonwebtoken';

export const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]; // Extract token from the Authorization header

  if (!token) {
    return res.status(403).json({ message: 'No token provided' });
  }

  // Verify the token
  jwt.verify(token, process.env.SECREAT_KEY, (err, user) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid token' });
    }
    
    req.user = user; // Attach the decoded user info to the request object
    next(); // Continue to the next middleware/route handler
  });
};
