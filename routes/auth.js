const express = require('express');

const router = express.Router()

const { register,login } = require('../controllers/authController');
const { check } = require('express-validator');
    
router.post('/register',
  check('firstName', 'First name is required').notEmpty(),
  check('email', 'Email is not valid').isEmail(),
  check('password', 'Password minimum 8 characters').notEmpty().isLength({ min: 8}),
  register)
router.post('/login', check('password', 'Password minimum 8 characters').notEmpty().isLength({ min: 8}),
login)

module.exports = router