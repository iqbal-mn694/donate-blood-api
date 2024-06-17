require('dotenv').config()

const express = require('express')
const app = express()
const port = 3000

// make connection to database 
const supabase = require('./models/dbConnection')


// use middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }))


// app route
app.use('/', require('./routes/app'))

// auth route
app.use('/auth', require('./routes/auth'))

app.listen(port, () => console.log(`Running on port ${port}!`))