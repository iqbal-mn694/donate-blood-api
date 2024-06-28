const express = require('express');

const router = express.Router()

const { register,login } = require('../controllers/authController');
const { check } = require('express-validator');
const { validateInput } = require('../middleware/validator');
const supabase = require('../models/dbConnection');
    
/**
 * @swagger
 * tags:
 *  name: Auth
 *  description: apis authentication
 */

/**
 * @swagger
 * /api/v1/auth/register:
 *  post:
 *    summary: Registrasi akun
 *    tags: [Auth]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *             name:
 *              type: string,
 *              description: Name,
 *              example: Asep
 *             username:
 *              type: string,
 *              description: Username
 *              example: asep234
 *             email:
 *              type: string,
 *              description: Email address
 *              example: asep12@gmail.com
 *             password: 
 *              type: string
 *              description: Password minimal 8 karakter
 *    responses:
 *      201:
 *        description: Berhasil registrasi
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                id:
 *                  type: uuid
 *                  description: uuid user
 *                  example: f25678393huwdnd2
 *                name:
 *                  type: string
 *                  description: Name
 *                  example: Asep
 *                email:
 *                  type: string,
 *                  description: Email address
 *                password: 
 *                  type: string
 *                  description: Password minimal 8 karakter          
 *      500:
 *        description: internal server error
*/
router.post('/register', validateInput([
  check('name').notEmpty().withMessage('Name is required'),
  check('email').isEmail().withMessage('E-mail is not valid')
    .normalizeEmail()
    .custom(async email => {
      const user = await supabase
        .from('users')
        .select('*')
        .eq('email', email)
        .single();

      if(user) throw { email: 'E-mail already in use' };
  }),
  check('password')
    .notEmpty().withMessage('Password is required')
    .isLength({ min: 8}).withMessage('Password minimun 8 characters')
    .isStrongPassword().withMessage('Password must be strong')
]), register);

  
/**
 * @swagger
 * /api/v1/auth/login:
 *  post:
 *    summary: login user
 *    tags: [Auth]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *             email:
 *              type: string,
 *              description: Email address
 *              example: asep12@gmail.com
 *             password: 
 *              type: string
 *              description: Password minimal 8 karakter
 *    responses:
 *      200:
 *        description: User berhasil login
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                email:
 *                  type: string,
 *                  description: Email address
 *                  example: asep12@gmail.com
 *                password: 
 *                  type: string
 *                  description: Password minimal 8 karakter
 *              
 *      500:
 *        description: Internal server error
*/
router.post('/login', validateInput([
  check('email').isEmail().withMessage('Email is not valid').normalizeEmail(),
  check('password')
    .notEmpty().withMessage('Password is required')
    .isLength({ min: 8}).withMessage('Password minimun 8 characters')
]), login);

module.exports = router;