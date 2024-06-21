const ErrorHandler = require('../libs/errorHandler')
const supabase = require('../models/dbConnection')

const authMiddleware = async(req, res, next) => {            
    try {
        // get authenticated user id
        const { data: { user }, } = await supabase.auth.getUser()
        req.authId = user.id
        next()
    } catch (error) {
        next(new ErrorHandler("User not authenticated", 401))
    }
    
}

module.exports = authMiddleware