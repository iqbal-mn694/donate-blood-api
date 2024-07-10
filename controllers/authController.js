// make connection to database 
const { validationResult } = require('express-validator')
const supabase = require('../models/dbConnection');
const asyncWrapper = require('../libs/asyncWrapper');
const { registerValidation } = require('../validation/registerValidation');
const { loginValidation } = require('../validation/loginValidation');

// controller for handle register
exports.register = asyncWrapper (async (req, res, next) => {
    const validateInput = await registerValidation(req);
    
    // console.log(validateInput === true)
    if(validateInput && validateInput.length !== 0) throw { status: 422, messages: validateInput } // bug

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
        
    if(error) throw error; // bug
    res.status(201).json({ success: true, status: 201, message: 'Register has been successfully', data })
})

// controller for handle login
exports.login = asyncWrapper (async (req, res, next) => {
    const validateInput = await loginValidation(req);

    if(validateInput && validateInput.length !== 0) throw { status: 422, messages: validateInput };
    const { data, error } = await supabase.auth.signInWithPassword({
        email: req.body.email,
        password: req.body.password
    })
        
    if(error) throw { status: 401, message: 'Invalid Login Credentials'};
        
    const accessToken = data.session.access_token;
    res.status(200).json({ success: true, status: 200, message: 'Login has been successfully', data: {
        token: accessToken} })   
})

