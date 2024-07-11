const express = require('express');
const router = express.Router();

const { auth } = require('../middleware/auth');
const { 
  makeBloodRequest, 
  getBloodRequests, 
  updateBloodRequest,
  deleteBloodRequest,
  clearBloodRequest,
  getNearbyRecipients,
  getRecipient, 
  getBloodRequest} = require('../controllers/requestController');

/**
 * @swagger
 * tags:
 *  name: Request
 *  description: Blood request apis
 */


/**
 * @swagger
 * /api/v1/requests:
 *  post:
 *    summary: Membuat request darah
 *    tags: [Request]
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
 *      required: true
 *      content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                bloodType:
 *                  type: string,
 *                  description: Tipe darah yang melakukan request darah,
 *                  example: A
 *                quantity:
 *                  type: int,
 *                  description: Jumlah labu yang dibutuhkan
 *                  example: 2
 *                hospitalName:
 *                  type: string,
 *                  description: Nama rumah sakit
 *                  example: RSUD dr.Soekardjo
 *                latitude: 
 *                  type: float
 *                  description: Koordinat(lat) yang melakukan request darah
 *                  example: -7.48959971004408
 *                longitude: 
 *                  type: float
 *                  description: Koordinat(long) yang melakukan request darah
 *                  example: 108.051243876179
 *    responses:
 *      201:
 *        description: Berhasil melakukan request darah
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                id:
 *                  type: int
 *                  description: requestID
 *                  example: 1
 *                user_id:
 *                  type: uuid
 *                  description: uuid user
 *                  example: f25678393huwdnd2
 *                bloodType:
 *                  type: string
 *                  description: Tipe darah
 *                  example: A
 *                quantity:
 *                  type: int
 *                  description: Jumlah labu yang dibutuhkan
 *                  example: 2
 *                hospital_name:
 *                  type: string
 *                  description: Hospital name
 *                  example: TMC
 *                request_at:
 *                  type: date
 *                  description: Waktu melakukan donor darah
 *                  example: 2024-06-18T09:51:21.959935
 *                status:
 *                  type: string
 *                  description: Apakah sudah terpenuhi
 *                  example: null
 *                lat:
 *                  type: float
 *                  description: Latitude
 *                  example: -7.1234
 *                long:
 *                  type: float
 *                  description: Longitude
 *                  example: 110.1234
 *      401:
 *        description: User not authenticated or not valid token     
 *      500:
 *        description: Internal server error
*/
router.post('/', auth, makeBloodRequest);

/**
 * @swagger
 * /api/v1/requests:
 *  get:
 *    summary: List request yang telah dibuat oleh user yang sedang login
 *    tags: [Request]
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
 *        description: Berhasil menampilkan list request user
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                data:
 *                  type: array
 *                  items:
 *                    type: object
 *                    properties:
 *                      id:
 *                        type: int
 *                        description: requestID
 *                        example: 1
 *                      user_id:
 *                        type: uuid
 *                        description: uuid user
 *                        example: f25678393huwdnd2
 *                      bloodType:
 *                        type: string
 *                        description: Tipe darah
 *                        example: A
 *                      quantity:
 *                        type: int
 *                        description: Jumlah labu yang dibutuhkan
 *                        example: 2
 *                      hospital_name:
 *                        type: string
 *                        description: Hospital name
 *                        example: TMC
 *                      request_at:
 *                        type: date
 *                        description: Waktu melakukan donor darah
 *                        example: 2024-06-18T09:51:21.959935
 *                      status:
 *                        type: string
 *                        description: Apakah sudah terpenuhi
 *                        example: Fulfilled
 *                      lat:
 *                        type: float
 *                        description: Latitude
 *                        example: -7.1234
 *                      long:
 *                        type: float
 *                        description: Longitude
 *                        example: 110.1234
 *      401:
 *        description: User is not authenticated 
 *      500:
 *        description: Internal server error
*/
router.get('/', auth, getBloodRequests);




/**
 * @swagger
 * /api/v1/requests/{requestID}:
 *  get:
 *    summary: Menampilkan detail request yang telah dibuat oleh user
 *    tags: [Request]
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
 *      - name: requestID
 *        in: path
 *        required: true
 *        description: requestID
 *    responses:
 *      200:
 *        description: Berhasil menampilkan detail request yang telah dibuat oleh user
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                id:
 *                  type: int
 *                  description: requestID
 *                  example: 1
 *                user_id:
 *                  type: uuid
 *                  description: uuid user
 *                  example: f25678393huwdnd2
 *                bloodType:
 *                  type: string
 *                  description: Tipe darah
 *                  example: A
 *                quantity:
 *                  type: int
 *                  description: Jumlah labu yang dibutuhkan
 *                  example: 2
 *                hospital_name:
 *                  type: string
 *                  description: Hospital name
 *                  example: TMC
 *                request_at:
 *                  type: date
 *                  description: Waktu melakukan donor darah
 *                  example: 2024-06-18T09:51:21.959935
 *                status:
 *                  type: string
 *                  description: Apakah sudah terpenuhi
 *                  example: Fulfilled
 *                lat:
 *                  type: float
 *                  description: Latitude
 *                  example: -7.1234
 *                long:
 *                  type: float
 *                  description: Longitude
 *                  example: 110.1234
 *      401:
 *        description: User is not authenticated 
 *      500:
 *        description: Internal server error
*/
router.get('/:requestID', auth, getBloodRequest);

/**
 * @swagger
 * /api/v1/requests:
 *  put:
 *    summary: Mengubah request darah
 *    tags: [Request]
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
 *      required: true
 *      content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                bloodType:
 *                  type: string,
 *                  description: Tipe darah yang melakukan request darah,
 *                  example: A
 *                quantity:
 *                  type: int,
 *                  description: Jumlah labu yang dibutuhkan
 *                  example: 2
 *                hospitalName:
 *                  type: string,
 *                  description: Nama rumah sakit
 *                  example: RSUD dr.Soekardjo
 *                latitude: 
 *                  type: float
 *                  description: Koordinat(lat) yang melakukan request darah
 *                  example: -7.48959971004408
 *                longitude: 
 *                  type: float
 *                  description: Koordinat(long) yang melakukan request darah
 *                  example: 108.051243876179
 *    responses:
 *      200:
 *        description: Berhasil mengubah request darah
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                id:
 *                  type: int
 *                  description: requestID
 *                  example: 1
 *                user_id:
 *                  type: uuid
 *                  description: uuid user
 *                  example: f25678393huwdnd2
 *                bloodType:
 *                  type: string
 *                  description: Tipe darah
 *                  example: A
 *                quantity:
 *                  type: int
 *                  description: Jumlah labu yang dibutuhkan
 *                  example: 2
 *                hospital_name:
 *                  type: string
 *                  description: Hospital name
 *                  example: TMC
 *                request_at:
 *                  type: date
 *                  description: Waktu melakukan donor darah
 *                  example: 2024-06-18T09:51:21.959935
 *                status:
 *                  type: string
 *                  description: Apakah sudah terpenuhi
 *                  example: Fulfilled
 *                lat:
 *                  type: float
 *                  description: Latitude
 *                  example: -7.1234
 *                long:
 *                   type: float
 *                   description: Longitude
 *                   example: 110.1234
 *      401:
 *        description: User not authenticated or not valid token     
 *      404:
 *        description: requestID is not found     
 *      500:
 *        description: Internal server error
*/
router.put('/:requestID', auth, updateBloodRequest);

/**
 * @swagger
 * /api/v1/requests/{requestID}:
 *  delete:
 *    summary: Menghapus request id tertentu
 *    tags: [Request]
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
 *      - name: requestID
 *        in: path
 *        required: true
 *        description: requestID
 *    responses:
 *      200:
 *        description: Berhasil menghapus request id tertentu
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                data: 
 *                  type: array
 *                  example: []
 *      401:
 *        description: User is not authenticated 
 *      500:
 *        description: Internal server error
*/
router.delete('/:requestID', auth, deleteBloodRequest);

/**
 * @swagger
 * /api/v1/requests/:
 *  delete:
 *    summary: Menghapus semua request
 *    tags: [Request]
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
 *        description: Berhasil menghapus semua request
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                data: 
 *                  type: array
 *                  example: []
 *      401:
 *        description: User is not authenticated 
 *      500:
 *        description: Internal server error
*/
router.delete('/', auth, clearBloodRequest);





/**
 * @swagger
 * tags:
 *  name: Recipients
 *  description: Recipients apis
 */
/**
 * @swagger
 * /api/v1/requests?recipients/nearby?long={value}&lat={value}:
 *  get:
 *    summary: List orang sekitar yang sedang membutuhkan darah atau melakukan request darah
 *    tags: [Recipients]
 *    parameters:
 *     - in: headers
 *       name: Authorization
 *       description: Bearer token
 *       schema: 
 *         type: string
 *         example: input_bearer_token
 *     - in: query
 *       name: long
 *       type: float
 *       description: longitude
 *     - in: query
 *       name: lat
 *       type: float
 *       description: latitude
 *    responses:
 *      200:
 *        description: Berhasil menampilkan list request darah
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                data:
 *                  type: array
 *                  items:
 *                    type: object
 *                    properties:
 *                      id:
 *                        type: int
 *                        description: Request id
 *                        example: 1
 *                      user_id:
 *                        type: uuid
 *                        description: uuid user
 *                        example: f25678393huwdnd2
 *                      blood_type:
 *                        type: string
 *                        description: Tipe darah yang melakukan request darah
 *                        example: A
 *                      quantity:
 *                        type: string
 *                        description: Jumlah labu yang dibutuhkan
 *                        example: 2
 *                      hospital_name:
 *                        type: string
 *                        description: Nama rumah sakit
 *                        example: RSUD dr.Soekardjo
 *                      requested_at:
 *                        type: date
 *                        description: Waktu melakukan request darah
 *                        example: 2024-06-18T09:51:21.959935
 *                      req_lat:
 *                        type: float
 *                        description: Koordinat(lat) yang melakukan request darah
 *                        example: -7.48959971004408
 *                      req_long: 
 *                        type: float
 *                        description: Koordinat(long) yang melakukan request darah
 *                        example: 108.051243876179
 *      401:
 *        description: User is not authenticated 
 *      500:
 *        description: Internal server error
*/
router.get('/recipients/nearby', auth, getNearbyRecipients);

/**
 * @swagger
 * /api/v1/{requestID}/recipients:
 *  get:
 *    summary: Menampilkan detail request penerima darah
 *    tags: [Recipients]
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
 *      - name: requestID
 *        in: path
 *        required: true
 *        description: requestID
 *    responses:
 *      200:
 *        description: Berhasil menampilkan detail request penerima
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                id:
 *                  type: int
 *                  description: requestID
 *                  example: 1
 *                user_id:
 *                  type: uuid
 *                  description: uuid user
 *                  example: f25678393huwdnd2
 *                bloodType:
 *                  type: string
 *                  description: Tipe darah
 *                  example: A
 *                quantity:
 *                  type: int
 *                  description: Jumlah labu yang dibutuhkan
 *                  example: 2
 *                hospital_name:
 *                  type: string
 *                  description: Hospital name
 *                  example: TMC
 *                request_at:
 *                  type: date
 *                  description: Waktu melakukan donor darah
 *                  example: 2024-06-18T09:51:21.959935
 *                status:
 *                  type: string
 *                  description: Apakah sudah terpenuhi
 *                  example: Fulfilled
 *                lat:
 *                  type: float
 *                  description: Latitude
 *                  example: -7.1234
 *                long:
 *                  type: float
 *                  description: Longitude
 *                  example: 110.1234
 *      401:
 *        description: User is not authenticated 
 *      500:
 *        description: Internal server error
*/
router.get('/:requestID/recipients', auth, getRecipient);

module.exports = router;
