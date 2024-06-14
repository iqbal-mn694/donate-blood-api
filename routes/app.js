const express = require('express')
const router = express.Router()

const supabase = require('../models/dbConnection')

const { requestBlood, showRequests, donateBlood, checkEligibelity, checkEl } = require('../controllers/appController')

// penerima melakukan request
router.post('/request', requestBlood)

// melihat siapa saja yang membutuhkan request berdasarkan lokasi dan kecukupan darah
router.get('/request', showRequests)

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
router.post('/donate', donateBlood)

router.get('/donate', (req, res) => {
    res.send('ini donate')
})

router.post('/check', checkEligibelity)
router.post('/check2', checkEl)

module.exports = router