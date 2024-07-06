const express = require('express');
const router = express.Router();

const { auth } = require('../middleware/auth');
const { donation, donationByID, deleteDonation, clearDonation } = require('../controllers/appController');

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
router.get('/', auth, donation);
router.get('/:donationID', auth, donationByID);
router.delete('/:donationID', auth, deleteDonation);
router.delete('/', auth, clearDonation);

module.exports = router;