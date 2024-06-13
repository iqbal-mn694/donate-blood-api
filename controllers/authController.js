// make connection to database 
const supabase = require('../models/dbConnection')

// controller for handle register
exports.register = async (req, res) => {
    try {
        const { data, error } = await supabase.auth.signUp({
            email: req.body.email,
            password: req.body.password,
            options: {
                data: {
                    first_name: req.body.firstName,
                    last_name: req.body.lastName
                }
            }
        })

        if(error) throw error

        res.send(data)
    } catch (error) {
        res.send(error)
    }
}

// controller for handle login
exports.login = async (req, res) => {
    try {
        const { data, error } = await supabase.auth.signInWithPassword({
            email: req.body.email,
            password: req.body.password
        })
        
        if(error) throw error

        res.send(data)
    } catch (error) {
        res.send(error)
    }
}

