const supabase = require('../models/dbConnection');
const asyncWrapper = require('../libs/asyncWrapper');
const { registerValidation } = require('../validation/registerValidation');
const { loginValidation } = require('../validation/loginValidation');

const jwt = require('jsonwebtoken');

exports.register = asyncWrapper (async (req, res, next) => {
    const validateInput = await registerValidation(req);
    
    if(validateInput && validateInput.length !== 0) throw { status: 422, messages: validateInput } // bug

    const { data, error } = await supabase.auth.signUp({
            email: req.body.email,
            password: req.body.password,
            options: {
                data: {
                    username: req.body.username
                }
            }
        });
        
    if(error) throw error; // bug
    res.status(201).json({ success: true, status: 201, message: 'Register has been successfully', data })
});

exports.login = asyncWrapper (async (req, res, next) => {
    const validateInput = await loginValidation(req);

    if(validateInput && validateInput.length !== 0) throw { status: 422, messages: validateInput };
    const { data, error } = await supabase.auth.signInWithPassword({
        email: req.body.email,
        password: req.body.password,
        options: {
            data: {
                username: req.body.username
            }
        }
    })
        
    if(error) throw { status: 401, message: 'Invalid Login Credentials'};

    const { user_metadata: user } = data.user;
    const accessToken = jwt.sign(user, process.env.JWT_ACCESS_KEY, { expiresIn: '15m'});
    const refreshToken = jwt.sign(user, process.env.JWT_REFRESH_KEY, { expiresIn: "30d"});

    req.session.token = accessToken;
    req.session.refreshToken = refreshToken;
    res.status(200).json({ success: true, status: 200, message: 'Login has been successfully', data: user, accessToken, refreshToken })   
});

exports.logout = asyncWrapper (async (req, res) => {
   const { error } = await supabase.auth.signOut();

   if(error) throw error;
   res.status(200).json({ success: true, status: 200, message: 'Logout has been successfully', data: [] });
});

exports.verify = asyncWrapper (async (req, res) => {
    const { data, error } = supabase.auth.verifyOtp({ email, token, type: 'email'});

    if(error) throw error;
    res.status(200).json({ success: true, status: 200, message: 'Account has been verified', data: data }) 
});

exports.me = asyncWrapper (async (req, res) => {
    console.log(req.cookies);
    res.status(200).json({ success: true, status:200, message: 'Success get account preferences', data: req.user });
});

exports.edit = asyncWrapper (async (req, res) => {
    const { data, error } = await supabase.auth.updateUser({
        email: req.body.email,
        password: req.body.password,
        data: {
            username: req.body.username,
            first_name: req.body.firstName,
            last_name: req.body.lastName,
            birthdate: req.body.birthdate,
            gender: req.body.gender,
            blood_type: req.body.bloodType
        }
    });

    if(error) throw error;
    res.status(200).json({ success: true, status: 200, message: 'User has been updated', data: data })
});

