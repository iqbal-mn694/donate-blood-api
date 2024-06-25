const express = require('express')
const router = express.Router()

const authMiddleware = require('../middleware/authMiddleware')

const { donateBlood, checkEligibelity, checkEl, makeBloodRequest, getBloodRequest, donation } = require('../controllers/appController')

// penerima melakukan request
router.post('/request', authMiddleware , makeBloodRequest)

// melihat siapa saja yang membutuhkan request berdasarkan lokasi dan kecukupan darah
router.get('/request', authMiddleware, getBloodRequest)

// hanya untuk coba coba saja, boleh dihapus
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

// melakukan donor darah
router.post('/donate', authMiddleware, donateBlood)
    
router.post('/check', checkEligibelity)

// donation history
router.get('/donation', authMiddleware, donation)

module.exports = router