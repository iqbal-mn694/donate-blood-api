const supabase = require('../models/dbConnection');

const authMiddleware = async(req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    try {
        // get authenticated user id
        const { data: { user }, error } = await supabase.auth.getUser();
        req.authId = user.id;

        if(error  || !token) throw error;
        next();
    } catch (error) {
        next({ messages: 'User not authenticated or not valid access token', statusCode: 401});
    }
}

module.exports = authMiddleware;