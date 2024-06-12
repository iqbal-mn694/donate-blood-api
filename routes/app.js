const express = require('express')
const router = express.Router()

const { requestBlood } = require('../controllers/appController')
const supabase = require('../models/dbConnection')

router.post('/request', requestBlood)

router.get('/request', async (req, res) => {
    const  { data: { user } } = await supabase.auth.getUser()
    if(user) {
        res.send(user)
    } else {
        res.send("Anauthorized")
    }
})

router.get('/donate', (req, res) => {
    res.send('ini donate')
})

module.exports = router