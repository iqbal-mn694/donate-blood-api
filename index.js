require('dotenv').config()

const express = require('express')
const app = express()
const port = 3000

// make connection to database 
const supabase = require('./models/dbConnection')
const errorHandler = require('./libs/errorHandlerr')


// use middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }))


// app route
app.use('/', require('./routes/app'))

// auth route
app.use('/auth', require('./routes/auth'))

// handling error
// app.use((err, req, res, next) => {
//     const { status = 404, message = "page not found"} = err
//     res.status(status).json({ error: true, status, message})
// })

app.use(errorHandler)

app.listen(port, () => console.log(`Running on port ${port}!`))