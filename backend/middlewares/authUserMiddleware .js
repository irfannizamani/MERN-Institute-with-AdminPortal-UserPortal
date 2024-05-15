const jwt = require('jsonwebtoken');

const authUserMiddleware = (req, res, next) => {
  try {
    const tokenUser = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(tokenUser, process.env.JWT_SECRET);
    req.tokenUser = tokenUser;
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).send({ error: 'Please authenticate as user.' });
  }
};

module.exports = authUserMiddleware;
