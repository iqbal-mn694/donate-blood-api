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
  getBloodRequest} = require('../controllers/appController');

/**
 * @swagger
 * /api/v1/request:
 *  post:
 *    summary: Membuat request darah
 *    tags: [App]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *             bloodType:
 *              type: string,
 *              description: Tipe darah yang melakukan request darah,
 *              example: A
 *             quantity:
 *              type: int,
 *              description: Jumlah labu yang dibutuhkan
 *              example: 2
 *             hospitalName:
 *              type: string,
 *              description: Nama rumah sakit
 *              example: RSUD dr.Soekardjo
 *             latitude: 
 *              type: float
 *              description: Koordinat(lat) yang melakukan request darah
 *              example: -7.48959971004408
 *             longitude: 
 *              type: float
 *              description: Koordinat(long) yang melakukan request darah
 *              example: 108.051243876179
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
 *                  description: Request id
 *                  example: 1
 *                user_id:
 *                  type: uuid
 *                  description: uuid user
 *                  example: f25678393huwdnd2
 *                blood_type:
 *                  type: string,
 *                  description: Tipe darah yang melakukan request darah
 *                  example: A
 *                quantity: 
 *                  type: int
 *                  description: Jumlah labu yang dibutuhkan
 *                  example: 2
 *                hospital_name:
 *                  type: string,
 *                  description: Nama rumah sakit
 *                  example: RSUD dr.Soekardjo         
 *                requested_at:
 *                  type: date,
 *                  description: Waktu melakukan request darah
 *                  example: RSUD dr.Soekardjo
 *      401:
 *        description: User not authenticated         
 *      500:
 *        description: Internal server error
*/
router.post('/', auth, makeBloodRequest);
router.get('/', auth, getBloodRequests);
router.get('/:requestID', auth, getBloodRequest);
router.put('/:requestID', auth, updateBloodRequest);
router.delete('/:requestID', auth, deleteBloodRequest);
router.delete('/', auth, clearBloodRequest);
/**
 * @swagger
 * /api/v1/request?long={value}&lat={value}:
 *  get:
 *    summary: List orang sekitar yang sedang membututuhkan darah atau melakukan request darah
 *    tags: [App]
 *    parameters:
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
router.get('/:requestID/recipients', auth, getRecipient);

module.exports = router;
