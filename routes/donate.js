const express = require('express')
const router = express.Router()

const { auth } = require('../middleware/auth')

const { donateBlood, donateBloodByRequestID } = require('../controllers/appController');


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
router.post('/', auth, donateBlood);
router.post('/:requestID', auth, donateBloodByRequestID);

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