const jwt = require('jsonwebtoken');
const db = require('../models/dbConnection');

exports.auth = async(req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
   
    try {
        if(!token) throw { messages: 'User not authenticated or not valid access token', statusCode: 401}
        
        jwt.verify(token, process.env.JWT_KEY, (error, decoded) => {
            if(error) throw { messages: 'User not authenticated or not valid access token', statusCode: 401};
            req.user = decoded;
            next();
        });        
    } catch (error) {
        next(error);
    }
}

// module.exports = authMiddleware;