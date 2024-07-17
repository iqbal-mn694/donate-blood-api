const express = require('express');
const router = express.Router()

const { register,login, logout, verify } = require('../controllers/authController');
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
 *                username:
 *                  type: string,
 *                  description: Username
 *                  example: asep234
 *                email:
 *                  type: string,
 *                  description: Email address
 *                  example: asep12@example.com  
 *      401:
 *        description: unauthorized
 *      500:
 *        description: internal server error
*/
router.post('/register', register);

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
 *                token:
 *                  type: string
 *                  description: Access Token
 *                  example: bearer_token123
 *              
 *      401:
 *        description: Unauthorized
 *      500:
 *        description: Internal server error
*/
router.post('/login', login);

router.delete('/logout', logout);

router.get('/verify-email', verify)

module.exports = router;