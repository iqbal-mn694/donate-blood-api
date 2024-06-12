// make connection to database 
const supabase = require('../models/dbConnection')

// controller for handle login
const login = async (req, res) => {
    const { data, error } = await supabase.auth.signInWithPassword({
        email: req.body.email,
        password: req.body.password
    }) 

    res.send(data)
}

const register = async (req, res) => {
    const { data , error } = await supabase.auth.signUp({
        email: req.body.email,
        password: req.body.password,
        options: {
            data: {
                first_name: req.body.firstName,
                last_name: req.body.lastName
            }
        }
    })

    res.send(data)
}

module.exports = { login, register }
