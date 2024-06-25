const express = require('express')
const router = express.Router()

const authMiddleware = require('../middleware/authMiddleware')

const { donateBlood, checkEligibelity, checkEl, makeBloodRequest, getBloodRequest, donation } = require('../controllers/appController')

/**
 * @swagger
 * tags:
 *  name: App
 *  description: blood app apis
 */

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
router.get('/request', authMiddleware, getBloodRequest)

/**
 * @swagger
 * /api/v1/donation:
 *  get:
 *    summary: Riwayat donor darah
 *    tags: [App]
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
 *                        description: Donation id
 *                        example: 1
 *                      user_id:
 *                        type: uuid
 *                        description: uuid user
 *                        example: f25678393huwdnd2
 *                      requestID:
 *                        type: int,
 *                        description: request id,
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
router.get('/donation', authMiddleware, donation)

/**
 * @swagger
 * /api/v1/check:
 *  post:
 *    summary: Mengecek kelayakan pendonor
 *    tags: [App]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *             hasChronic:
 *               type: boolean
 *               description: Mempunyai penyakit kronis?
 *               example: false
 *             lastDonation:
 *               type: date
 *               description: Terakhir kali mendonorkan darah
 *               example: 2-14-2024
 *             age:
 *               type: int
 *               description: Usia pendonor
 *               example: 20
 *             healthy:
 *               type: boolean
 *               description: Sehat atau tidak?
 *               example: true
 *             systolic:
 *               type: int
 *               description: Tekanan systolic
 *               example: 100
 *             diastolic:
 *               type: int
 *               description: Tekanan diastolic
 *               example: 70
 *             temperature:
 *               type: float
 *               description: Suhu tubuh
 *               example: 36.6
 *             pulse:
 *               type: int
 *               description: Detak nadi
 *               example: 60
 *             weight:
 *               type: float
 *               description: Berat badan
 *               example: 45
 *             hemoglobin:
 *               type: float
 *               description: Kadar hemoglobin
 *               example: 12.5
 *    responses:
 *      201:
 *        description: Anda layak mendonorkan darah. Silahkan menuju ke tempat pendonoran darah!
 *      401: 
 *        description: User is not authenticated
 *      500:
 *        description: Internal server error
*/
router.post('/check', checkEligibelity)


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
router.post('/request', authMiddleware , makeBloodRequest)


/**
 * @swagger
 * /api/v1/donate:
 *  post:
 *    summary: Melakukan donor darah
 *    tags: [App]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *             requestID:
 *              type: int,
 *              description: request id,
 *              example: 1
 *            
 *    responses:
 *      201:
 *        description: Berhasil mendonorkan darah
 *      401:
 *        description: User is not authenticated
 *      500:
 *        description: Internal server error
*/
router.post('/donate', authMiddleware, donateBlood)

router.get('/request-test', async(req, res) => {    
    const test = await supabase.from('blood_request').insert(
        {
            user_id : "2f53ee64-2aa2-469e-aefc-479a322559b0",
            blood_type: "A",
            quantity: 2,
            hospital_name: "RSUD",
            location: 'POINT(108.25293 -7.3787595)'
        },
        )

    res.send(test)
})




module.exports = router