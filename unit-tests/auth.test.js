const supertest = require('supertest');
const app = require('../index');
const db = require('../models/dbConnection.js');

describe('POST /api/v1/auth/register', () => {
  it('should can register new user', async () => {
    const result = await supertest(app)
      .post('/api/v1/auth/register')
      .send({
        "firstName": "Babal",
        "lastName": "Mutaqin",
        "email" : "garenahiber@gmail.com",
        "password"  : "12345678"
      })
      expect(result.status).toBe(201);
      expect(result.body.data.firstName).toBe('Babal');
      expect(result.body.data.lastName).toBe('Mutaqin');
      expect(result.body.data.email).toBe('garenahiber@gmail.com');
  });

  it('should rejected if request is invalid', async () => {
    const result = await supertest(app)
      .post('/api/v1/auth/register')
      .send({
         "firstName": "",
        "lastName": "",
        "email" : "",
        "password"  : ""
      })

      expect(result.status).toBe(422);
      expect(result.body.messages).toBeDefined();
      
  });

  it('should rejected if user is already registered', async () => {
    const result = await supertest(app)
      .post('/api/v1/auth/register')
      .send({
        "firstName": "Babal",
        "lastName": "Mutaqin",
        "email" : "garenahiber134@gmail.com",
        "password"  : "12345678"
      })
      expect(result.status).toBe(422);
      expect(result.body.messages).toBeDefined();
  });

  it('should rejected if request is limit', async () => {
    const result = await supertest(app)
      .post('/api/v1/auth/register')
      .send({
        "firstName": "Babal",
        "lastName": "Mutaqin",
        "email" : "garenahiber@gmail.com",
        "password"  : "12345678"
      })
      expect(result.status).toBe(429);
      expect(result.body.messages).toBeDefined(); 
  });
})

describe('POST /api/v1/auth/login', () => {
  it('should can login user', async () => {
    const result = await supertest(app)
      .post('/api/v1/auth/login')
      .send({
        "email" : "forthis345@gmail.com",
        "password" : "12345678"
      })
      expect(result.status).toBe(200);
      expect(result.body.data.token).toBeDefined()
  });

  it('should rejected if request is invalid', async () => {
    const result = await supertest(app)
      .post('/api/v1/auth/login')
      .send({
        "email" : "",
        "password" : ""
      })
      expect(result.status).toBe(422);
      expect(result.body.messages).toBeDefined()
  });
})