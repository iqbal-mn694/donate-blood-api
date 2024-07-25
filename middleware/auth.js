const jwt = require('jsonwebtoken');
const db = require('../models/dbConnection');
const { verifyJWT, generateJWT } = require('../libs/makeJWT');
const JWT_ACCESS_KEY = process.env.JWT_ACCESS_KEY;
const JWT_REFRESH_KEY = process.env.JWT_REFRESH_KEY;

exports.auth = async(req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    try {
        if(!token) throw { messages: 'User not authenticated or not valid access token', statusCode: 401}
        let decoded = await verifyJWT(token, JWT_ACCESS_KEY);
        const user = {
            id: decoded.id,
            username: decoded.username,
            email: decoded.email,
            phone: decoded?.phone || null,
            first_name: decoded?.first_name || null,
            last_name: decoded?.last_name || null,
            address: decoded?.address || null,
            birthdate: decoded?.birthdate || null,
            blood_type: decoded?.blood_type || null,
            gender: decoded?.gender || null,
        }

        req.user = user;
        next();
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
            const { exp, ...payload } = await verifyJWT(refreshToken, JWT_REFRESH_KEY)
            const newAccessToken = generateJWT(payload, JWT_ACCESS_KEY);

            req.token = newAccessToken;
            next();     
    } catch(error) {
        next(error)
    }
}
