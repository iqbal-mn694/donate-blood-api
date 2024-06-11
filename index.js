const express = require('express')
const app = express()
const port = 3000

// use ,iddleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// auth route
app.use('/auth', require('./routes/auth'))


app.listen(port, () => console.log(`Example app listening on port ${port}!`))