const express = require('express')
const router = express.Router()

const { requestBlood, showRequests } = require('../controllers/appController')
const supabase = require('../models/dbConnection')

router.post('/request', requestBlood)

router.get('/request', showRequests)

router.get('/request-test', async(req, res) => {
    const test = await supabase.from('blood_request').insert(
        {
            user_id : "f4b8bc9f-01cf-4345-ad2d-72550d403418",
            blood_type: "A",
            quantity: 2,
            hospital_name: "RSUD",
            location: 'POINT(108.25293 -7.3787595)'
        },
        )

    res.send(test)
})

router.get('/donate', (req, res) => {
    res.send('ini donate')
})

module.exports = router