const supabase = require('../models/dbConnection')

const authMiddleware = async(req, res, next) => {            
    try {
        // get authenticated user id
        const { data: { user }, error } = await supabase.auth.getUser();
        
        req.authId = user.id
        next()
    } catch (error) {
        next({ message: 'User not authenticated', statusCode: 401})
    }
    
}

module.exports = authMiddleware