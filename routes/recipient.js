const express = require('express');
const router = express.Router();

const { auth } = require('../middleware/auth');
const { getRecipients, getNearbyRecipients, getRecipient } = require('../controllers/recipientController');

/**
 * @swagger
 * tags:
 *  name: Recipients
 *  description: Recipients apis
 */

router.get('/', auth, getRecipients);

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
router.get('/nearby', auth, getNearbyRecipients);

/**
 * @swagger
 * /api/v1/recipients/{requestID}:
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
router.get('/:requestID', auth, getRecipient);