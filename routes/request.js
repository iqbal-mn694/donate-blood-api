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
 * /api/v1/requests:
 *  post:
 *    summary: Membuat request darah
 *    tags: [App]
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
 *                id:
 *                  type: int
 *                  description: requestID
 *                  example: 1
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
 *    tags: [App]
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
 *                      requestID:
 *                        type: int
 *                        description: request id
 *                        example: 1
 *                      quantity:
 *                        type: string
 *                        description: Jumlah labu yang dibutuhkan
 *                        example: 2
 *                      donation_at:
 *                        type: date
 *                        description: Waktu melakukan donor darah
 *                        example: 2024-06-18T09:51:21.959935
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
 *    tags: [App]
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
 *    tags: [App]
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
 *                id:
 *                  type: int
 *                  description: requestID
 *                  example: 1
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
 *      401:
 *        description: User not authenticated or not valid token     
 *      500:
 *        description: Internal server error
*/
router.put('/:requestID', auth, updateBloodRequest);

/**
 * @swagger
 * /api/v1/requests/{requestID}:
 *  delete:
 *    summary: Menghapus request id tertentu
 *    tags: [App]
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
 *    tags: [App]
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
 * /api/v1/requests?recipients/nearby?long={value}&lat={value}:
 *  get:
 *    summary: List orang sekitar yang sedang membututuhkan darah atau melakukan request darah
 *    tags: [App]
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
 *    tags: [App]
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
 *      401:
 *        description: User is not authenticated 
 *      500:
 *        description: Internal server error
*/
router.get('/:requestID/recipients', auth, getRecipient);

module.exports = router;
