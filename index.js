require('dotenv').config()
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const xss = require('xss-clean');
const swaggerUI = require('swagger-ui-express');
const swaggerDoc = require('swagger-jsdoc')
const errorHandler = require('./middleware/errorHandler');
const PORT = process.env.PORT || 8000;

const session = require('express-session');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Blood Donate App',
      description: 'Web App for Donate Blood'
    },
    components: {
      securitySchemas: {
        bearerAuth: {
          type: 'http',
          schema: 'bearer',
        }
      }
    },
    servers: [
      {
        url: 'https://donate-blood-api-development.up.railway.app',
      }
    ],
  },
  apis: ['./routes/*.js']
}

const spec = swaggerDoc(options)

const app = express();

// use middleware
app.use(cors({
  origin: ["http://localhost:5500", "http://127.0.0.1:5500", "http://localhost:3000", "http://127.0.0.1:3000"],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use(helmet());
app.use(xss());

app.disable('x-powered-by')

app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: process.env.SESSION_KEY,
  cookie: {
    maxAge: 1000 * 60 * 60,
    sameSite: 'none',
    secure: true,
  }
}));

// web app api endpoint
app.use('/api/v1', require('./routes/api'));

// api endpoint documentation
app.use('/api-doc', swaggerUI.serve, swaggerUI.setup(spec))

app.use(errorHandler)

app.listen(PORT, "0.0.0.0", () => console.log(`Running on port ${PORT}!`));

module.exports = app;