const db = require('../models/dbConnection');

exports.auth = async(req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    try {
        const { data: { user }, error } = await db.auth.getUser();
        req.user = user;

        if(error  || !token) throw error;
        next();
    } catch (error) {
        next({ messages: 'User not authenticated or not valid access token', statusCode: 401});
    }
}

// module.exports = authMiddleware;