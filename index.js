require('dotenv').config()
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const xss = require('xss-clean');
const swaggerUI = require('swagger-ui-express');
const swaggerDoc = require('swagger-jsdoc')
const errorHandler = require('./middleware/errorHandler');
const path = require('path');
const { auth } = require('./middleware/auth');
const PORT = process.env.PORT || 8000;

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

app.use(express.json());
// app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));

app.use(cors());
app.use(helmet());
app.use(xss());

app.disable('x-powered-by')

// web app api endpoint
app.use('/uploads', auth ,express.static(path.join(__dirname, 'public/uploads')));

app.use('/api/v1', require('./routes/api'));

// api endpoint documentation
app.use('/api-doc', swaggerUI.serve, swaggerUI.setup(spec));

app.use(errorHandler)


app.listen(PORT, "0.0.0.0", () => console.log(`Running on port ${PORT}!`));

module.exports = app;