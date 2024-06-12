// make connection to database 
const supabase = require('../models/dbConnection')

// controller for handle register
const register = async (req, res) => {
    const userData = await supabase.auth.signUp({
        email: req.body.email,
        password: req.body.password,
        options: {
            data: {
                first_name: req.body.firstName,
                last_name: req.body.lastName
            }
        }
    })

    res.send(userData)
}

// controller for handle login
const login = async (req, res) => {
    const userData = await supabase.auth.signInWithPassword({
        email: req.body.email,
        password: req.body.password
    }) 

    
    res.send(userData)
}

module.exports = { register, login }
