const express = require('express');
const router = express.Router();

const { auth } = require('../middleware/auth');
const { 
  donation,
  donationByID,
  deleteDonation,
  clearDonation,
  detailDonationProcessed, 
  donationProgress
} = require('../controllers/donationController');

/**
 * @swagger
 * tags:
 *  name: Donation
 *  description: Donation history apis
 */

/**
 * @swagger
 * /api/v1/donations:
 *  get:
 *    summary: Riwayat donor darah
 *    tags: [Donation]
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
 *        description: Berhasil menampilkan list donations
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
router.get('/', auth, donation);

router.get('/progress', auth, donationProgress);

/**
 * @swagger
 * /api/v1/donations/{donationID}:
 *  get:
 *    summary: Riwayat donor darah berdasarkan donation id tertentu
 *    tags: [Donation]
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
 *      - name: Donation ID
 *        in: path
 *        required: true
 *        description: Donation ID
 *    responses:
 *      200:
 *        description: Berhasil menampilkan riwayat donor darah berdasarkan donation id tertentu
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                id:
 *                  type: int
 *                  description: Donation id
 *                  example: 1
 *                user_id:
 *                  type: uuid
 *                  description: uuid user
 *                  example: f25678393huwdnd2
 *                requestID:
 *                  type: int,
 *                  description: request id
 *                  example: 1
 *                quantity:
 *                  type: string
 *                  description: Jumlah labu yang dibutuhkan
 *                  example: 2
 *                donation_at:
 *                  type: date
 *                  description: Waktu melakukan donor darah
 *                  example: 2024-06-18T09:51:21.959935
 *      401:
 *        description: User is not authenticated 
 *      500:
 *        description: Internal server error
*/
router.get('/:donationID', auth, donationByID);

router.get('/processed/:processedID', auth, detailDonationProcessed);


/**
 * @swagger
 * /api/v1/donations/{donationID}:
 *  delete:
 *    summary: Menghapus riwayat donation berdasarkan donation id tertentu
 *    tags: [Donation]
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
 *      - name: Donation ID
 *        in: path
 *        required: true
 *        description: Donation ID
 *    responses:
 *      200:
 *        description: Berhasil menghapus riwayat donor darah berdasarkan donation id tertentu
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
router.delete('/:donationID', auth, deleteDonation);

/**
 * @swagger
 * /api/v1/donations/:
 *  delete:
 *    summary: Menghapus semua riwayat donation
 *    tags: [Donation]
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
 *        description: Berhasil menghapus semua riwayat donor darah
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
router.delete('/', auth, clearDonation);

module.exports = router;