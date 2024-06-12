const express = require('express')

const router = express.Router()

const { register,login } = require('../controllers/authController')

// router.get('/login', (req, res) => {
//     res.send("login")
// })


// register router
// router.get('/register', async (req, res) => {
//         res.send('Ini register')
//     })
    
router.post('/register', register)
router.post('/login', login)

module.exports = router