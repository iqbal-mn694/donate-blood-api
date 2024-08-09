const express = require('express')
const router = express.Router()

const { auth } = require('../middleware/auth')

const { donateBlood, donateBloodByRequestID, detailDonor, detailDonorByRequestID, detailDonorByDonorID } = require('../controllers/donateController');

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

router.get('/', detailDonorByDonorID);
router.get('/', detailDonorByRequestID);

// router.get('/request-test', async(req, res) => {    
//     const test = await supabase.from('blood_request').insert(
//         {
//             user_id : "2f53ee64-2aa2-469e-aefc-479a322559b0",
//             blood_type: "A",
//             quantity: 2,
//             hospital_name: "RSUD",
//             location: 'POINT(108.25293 -7.3787595)'
//         },
//         )

//     res.send(test)
// })




module.exports = router