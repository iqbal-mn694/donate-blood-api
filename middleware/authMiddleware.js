const supabase = require('../models/dbConnection')

const authMiddleware = async(req, res, next) => {
    // get user from database
    const { data: { user } } = await supabase.auth.getUser()
    const isAuthenticated = user

    // is user authenticated?
    if (!isAuthenticated){
        res.status(401).json({ 
            error: true,
            status: 401,
            message: 'User not authenticated' 
        })
    } else {
        // get authenticated id
        req.authId = user.id
        next()
    }
}

module.exports = authMiddleware