const express = require('express');
const router = express.Router()

const { register, login, logout, verify, me, edit, detail } = require('../controllers/authController');
const { validateInput } = require('../middleware/validator');
const { auth, generateAccessToken } = require('../middleware/auth');
const imageUpload = require('../middleware/imageUpload');
const { generateJWT, verifyJWT } = require('../libs/makeJWT');

const JWT_ACCESS_KEY = process.env.JWT_ACCESS_KEY;
const JWT_REFRESH_KEY = process.env.JWT_REFRESH_KEY;
    
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
 *        description: Berhasil Registrasi user
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                data:
 *                  type: object
 *                  properties:
 *                    id: 
 *                      type: uuid
 *                      description: uuid
 *                      example: f25678393huwdnd2
 *                    email:
 *                      type: string
 *                      description: Email address
 *                      example: asep12@gmail.com
 *                    phone:
 *                      type: string
 *                      description: Nomor telepon
 *                      example: ""
 *                    user:
 *                      type: object
 *                      properties:
 *                        username: 
 *                          type: string
 *                          description: Username
 *                          example: asep234
 *                        first_name: 
 *                          type: string
 *                          description: Nama depan
 *                          example: ""
 *                        last_name: 
 *                          type: string
 *                          description: Nama belakang
 *                          example: ""
 *                        birthdate: 
 *                          type: date
 *                          description: Tanggal lahir
 *                          example: ""
 *                        address: 
 *                          type: string
 *                          description: Alamat rumah
 *                          example: ""
 *                        gender: 
 *                          type: enum
 *                          description: Jenis Kelamin
 *                          example: ""
 *                        blood_type: 
 *                          type: enum
 *                          description: Tipe darah
 *                          example: ""
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

/**
 * @swagger
 * /api/v1/auth/logout:
 *  post:
 *    summary: Logout user
 *    tags: [Auth]
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - name: Authorization
 *        in: header
 *        required: true
 *        description: Bearer token
 *        schema: 
 *          type: string
 *          example: input_bearer_token
 *    responses:
 *      200:
 *        description: User Berhasil Lpgout
 *      401:
 *        description: User is not authenticated 
 *      500:
 *        description: Internal server error
*/
router.post('/logout', logout);

router.get('/verify-email', verify);

/**
 * @swagger
 * /api/v1/auth/me:
 *  get:
 *    summary: Detail akun user
 *    tags: [Auth]
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - name: Authorization
 *        in: header
 *        required: true
 *        description: Bearer token
 *        schema: 
 *          type: string
 *          example: input_bearer_token
 *    responses:
 *      200:
 *        description: Berhasil mendapatkan detail akun user
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                data:
 *                  type: object
 *                  properties:
 *                    user:
 *                      type: object
 *                      properties:
 *                        id: 
 *                          type: uuid
 *                          description: uuid
 *                          example: f25678393huwdnd2
 *                        username: 
 *                          type: string
 *                          description: Username
 *                          example: asep123
 *                        email:
 *                          type: string
 *                          description: Email address
 *                          example: asep12@gmail.com
 *                        phone:
 *                          type: string
 *                          description: Nomor telepon
 *                          example: 085211119922                         
 *                        first_name: 
 *                          type: string
 *                          description: Nama depan
 *                          example: Asep
 *                        last_name: 
 *                          type: string
 *                          description: Nama belakang
 *                          example: Kasep
 *                        address: 
 *                          type: string
 *                          description: Alamat rumah
 *                          example: Jln.Tamansari No.30, Kota Tasikmalaya
 *                        birthdate: 
 *                          type: date
 *                          description: Tanggal lahir
 *                          example: 06-09-2003
 *                        blood_type: 
 *                          type: enum
 *                          description: Tipe darah
 *                          example: A
 *                        gender: 
 *                          type: enum
 *                          description: Jenis Kelamin
 *                          example: Laki-laki
 *      401:
 *        description: User is not authenticated 
 *      500:
 *        description: Internal server error
*/
router.get('/me', auth, me);

router.get('/me/:id', auth, detail);

/**
 * @swagger
 * /api/v1/auth/me:
 *  put:
 *    summary: Update user
 *    tags: [Auth]
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - name: Authorization
 *        in: header
 *        required: true
 *        description: Bearer token
 *        schema: 
 *          type: string
 *          example: input_bearer_token
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              username:
 *                type: string
 *                description: Username
 *                example: asep123
 *              email:
 *                type: string,
 *                description: Email address
 *                example: asep12@gmail.com
 *              password: 
 *                type: string
 *                description: Password minimal 8 karakter
 *              firstName:
 *                type: string
 *                description: Nama depan
 *                example: asep
 *              lastName:
 *                type: string
 *                description: Nama belakang
 *                example: ganteng
 *              birthdate:
 *                type: date
 *                description: Tanggal lahir
 *                example: 06-02-2003
 *              gender:
 *                type: enum
 *                description: Jenis kelamin
 *                example: Laki-laki
 *              bloodType:
 *                type: enum
 *                description: Golongan darah
 *                example: A
 *    responses:
 *      200:
 *        description: Berhasil memperbarui akun
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                data:
 *                  type: object
 *                  properties:
 *                    id:
 *                      type: uuid
 *                      description: uuid user
 *                      example: f25678393huwdnd2
 *                    username:
 *                      type: string
 *                      description: Username
 *                      example: asep123
 *                    email:
 *                      type: string,
 *                      description: Email address
 *                      example: asep12@gmail.com
 *                    firstName:
 *                      type: string
 *                      description: Nama depan
 *                      example: asep
 *                    lastName:
 *                      type: string
 *                      description: Nama belakang
 *                      example: ganteng
 *                    birthdate:
 *                      type: date
 *                      description: Tanggal lahir
 *                      example: 06-02-2003
 *                    gender:
 *                      type: enum
 *                      description: Jenis kelamin
 *                      example: Laki-laki
 *                    bloodType:
 *                      type: enum
 *                      description: Golongan darah
 *                      example: A  
 *      401:
 *        description: unauthorized
 *      500:
 *        description: internal server error
*/
router.put('/me', auth, imageUpload.single('image'), edit);

router.get('/refresh-token' , auth, async (req, res) => {
  // const userData = req.user;
  const refreshToken = req.cookies.jwt;
  
  const { exp, ...payload } = await verifyJWT(refreshToken, JWT_REFRESH_KEY)
  const newAccessToken = generateJWT(payload, JWT_ACCESS_KEY, "15m");

 res.status(200).json({ success: true, status: 200, message: 'Success get new access token', accessToken: newAccessToken })
})

module.exports = router;