const express = require('express')
const router = express.Router()

const { auth } = require('../middleware/auth')

const { donateBlood, donateBloodByRequestID, detailDonorProcessed, detailDonorByRequestID, detailDonorByDonorID, cancelDonateBlood } = require('../controllers/donateController');

/**
 * @swagger
 * tags:
 *  name: Donate
 *  description: Donate blood apis
 */


/**
 * @swagger
 * /api/v1/donate:
 *  post:
 *    summary: Melakukan donor darah
 *    tags: [Donate]
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
 *      201:
 *        description: Berhasil mendonorkan darah
 *      401:
 *        description: User is not authenticated ot not valid token
 *      500:
 *        description: Internal server error
*/
router.post('/', auth, donateBlood);

/**
 * @swagger
 * /api/v1/donate/{requestID}:
 *  post:
 *    summary: Melakukan donor darah berdasarkan request id tertentu
 *    tags: [Donate]
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
 *        schema: 
 *          type: int
 *          example: 2
 *    responses:
 *      201:
 *        description: Berhasil mendonorkan darah
 *      401:
 *        description: User is not authenticated ot not valid token
 *      500:
 *        description: Internal server error
*/
router.post('/:requestID', auth, donateBloodByRequestID);

router.get('/donation-detail/:donorID', auth, detailDonorByDonorID);

router.get('/recipient', auth, detailDonorByRequestID);

router.delete('/cancel/:donorID', auth, cancelDonateBlood)

module.exports = router