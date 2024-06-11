const express = require('express')

const router = express.Router()


// make connection to database 
const supabase = require('../database/dbConnection')

router.post('/request', (req, res) => {
    const { bloodType,quantity, hospitalName, hospitalAddress } = req.body

    res.send(req.body)

})

router.get('/request', async (req, res) => {
    const { data, error } = await supabase.auth.getUser()
    res.send(data)
})

router.get('/donate', (req, res) => {
    res.send('ini donate')
})

module.exports = router