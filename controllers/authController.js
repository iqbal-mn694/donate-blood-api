const asyncWrapper = require('../libs/asyncWrapper');
const supabase = require('../models/dbConnection');
const jwt = require('jsonwebtoken');
const { registerValidation } = require('../validation/registerValidation');
const { loginValidation } = require('../validation/loginValidation');
const { generateJWT, verifyJWT } = require('../libs/makeJWT');

const JWT_ACCESS_KEY = process.env.JWT_ACCESS_KEY;
const JWT_REFRESH_KEY = process.env.JWT_REFRESH_KEY;


exports.register = asyncWrapper (async (req, res, next) => {
    const validateInput = await registerValidation(req);
    
    if(validateInput && validateInput.length !== 0) throw { status: 422, messages: validateInput } // bug
    const { data, error } = await supabase.auth.signUp({
            email: req.body.email,
            password: req.body.password,
            options: {
                data: {
                    username: req.body.username
                },
                // emailRedirectTo: "http://localhost:3000/login",
            }
        });
        
    if(error) throw error; // bug
    const { user: { user_metadata, id }} = data;
    const user = { id, ...user_metadata }

    res.status(201).json({ success: true, status: 201, message: 'Register has been successfully, please check your email for account verification', user })
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
        
    if(error) throw { success: false, status: 401, message: 'Invalid Login Credentials'};
    const { user: { user_metadata, id }} = data;
    const user = { id, ...user_metadata }

    const accessToken = generateJWT(user, JWT_ACCESS_KEY, "15m");
    const refreshToken = generateJWT(user, JWT_REFRESH_KEY, "30d");

    await supabase
        .from('token')
        .insert({
            user_id: id,
            token: refreshToken
    });

    res.status(200).json({ success: true, status: 200, message: 'Login has been successfully', user, accessToken })   
});

exports.logout = asyncWrapper (async (req, res) => {
    const { error } = await supabase
        .from('token')
        .delete()
        .eq('user_id', req.user.id);

    if(error) throw error;
    res.status(200).json({ success: true, status: 200, message: 'Logout has been successfully', data: [] });
});

exports.verify = asyncWrapper (async (req, res) => {
    const { data, error } = supabase.auth.verifyOtp({ email, token, type: 'email'});

    if(error) throw error;
    res.status(200).json({ success: true, status: 200, message: 'Account has been verified', data: data }) 
});

exports.me = asyncWrapper (async (req, res) => {
    res.status(200).json({ success: true, status:200, message: 'Success get account preferences', user: req.user });
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
            blood_type: req.body.bloodType,
            profile_image: req.file && `Uploads/${req.file.filename}`,
        }
    });

    if(error) throw error;
    const accessToken = generateJWT(data, JWT_ACCESS_KEY, "15m");
    res.status(200).json({ success: true, status: 200, message: 'User has been updated', data: data, accessToken})
});

exports.detail = asyncWrapper (async (req, res) => {
    const { id: userID } = req.params; 

    const { data, error } = await supabase.from('profiles').select().eq('id', userID);

    if(error) throw error;
    res.status(200).json({ success: true, status:200, message: 'Success get account preferences', data });
})

exports.refreshToken = asyncWrapper (async (req, res) => {
    const { data: { token }, error } = await dbConnection
      .from('token')
      .select()
      .eq('user_id', req.user.id)
      .single();
    
    if(error) throw error;
    const { exp, ...payload } = await verifyJWT(token, JWT_REFRESH_KEY)
    const accessToken = generateJWT(payload, JWT_ACCESS_KEY, "15m");
  
   res.status(200).json({ success: true, status: 200, message: 'Success get new access token', accessToken })
})

