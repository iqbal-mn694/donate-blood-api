const express = require('express');
const router = express.Router();

const { checkEligibelity } = require('../controllers/checkController');

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
router.post('/', checkEligibelity);

module.exports = router;