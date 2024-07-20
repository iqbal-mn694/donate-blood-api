const jwt = require('jsonwebtoken');
const db = require('../models/dbConnection');

exports.auth = async(req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    try {
        if(!token) throw { messages: 'User not authenticated or not valid access token', statusCode: 401}
        jwt.verify(token, process.env.JWT_ACCESS_KEY, (error, decoded) => {
            if(error) throw { messages: 'User not authenticated or not valid access token', statusCode: 401};
            req.user = decoded;
            next();
        });        
    } catch (error) {
        next(error);

    }
}

// bug
exports.generateAccessToken = async(req, res, next) => {
    const authHeader = req.headers['authorization'];
    const refreshToken = authHeader && authHeader.split(' ')[1];
    
    try {
        if(!refreshToken) throw { messages: 'User not authenticated or not valid access token', statusCode: 401}
        jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY, (error, decoded) => {            
            if(error) throw { messages: 'User not authenticated or not valid access token', statusCode: 401};

            const { exp, ...payload } = decoded;
            const newAccessToken = jwt.sign(payload, process.env.JWT_ACCESS_KEY);
            req.token = newAccessToken;
            next();     
      })
    } catch(error) {
        next(error)
    }
}
