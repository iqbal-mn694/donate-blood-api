require('dotenv').config()

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const errorHandler = require('./middleware/errorHandler');
const xss = require('xss-clean');
const port = 3000

const app = express()

// use middleware
app.use(cors());

app.use(helmet());
app.use(xss());

app.disable('x-powered-by')

app.use(express.json())
app.use(express.urlencoded({ extended: false }));


// routes
app.use('/', require('./routes/app'))
app.use('/auth', require('./routes/auth'))

app.use(errorHandler)

app.listen(port, () => console.log(`Running on port ${port}!`))