const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    console.log('Middleware de auth - listo para JWT');
    next();
};

module.exports = authMiddleware;