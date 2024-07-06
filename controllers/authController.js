// make connection to database 
const { validationResult } = require('express-validator')
const supabase = require('../models/dbConnection');
const asyncWrapper = require('../libs/asyncWrapper');

// controller for handle register
exports.register = asyncWrapper (async (req, res, next) => {
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
        
        if(error) throw error;
        res.status(201).json({ message: 'Register has been successfully', data })
})

// controller for handle login
exports.login = asyncWrapper (async (req, res, next) => {
        const { data, error } = await supabase.auth.signInWithPassword({
            email: req.body.email,
            password: req.body.password
        })
        
        if(error) throw { error: true, message: 'Invalid Login Credentials'};
        
        const accessToken = data.session.access_token;
        res.status(200).json({ message: 'Login has been successfully', accessToken })   
})

