const supertest = require('supertest');
const app = require('../index');
const db = require('../models/dbConnection.js');
const errorHandler = require('../middleware/errorHandler.js');

describe('POST /api/v1/auth/register', () => {
  it('should can register new user', async () => {
    const result = await supertest(app)
      .post('/api/v1/auth/register')
      .send({
        "username": "babal2",
        "email" : "mutaqiniqbal37@gmail.com",
        "password"  : "12345678"
      })
      expect(result.status).toBe(201);
      expect(result.body.data.username).toBe('babal2');
      expect(result.body.data.email).toBe('mutaqiniqbal37@gmail.com');
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
        "username": "babal21",
        "email" : "garenahiber134@gmail.com",
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
      expect(result.body.data.token).toBeDefined();
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
});

describe('DELETE /api/v1/auth/logout', () => {
  let token;
  beforeEach(async () => {
    const { data, error } = await db.auth.signInWithPassword({
      email: 'forthis345@gmail.com',
      password: '12345678'
    });

    if(error) throw error;
    token = data.session.access_token;
  });

  it('should can logout', async () => {
    const result = await supertest(app)
      .delete('/api/v1/auth/logout')
      .set('Authorization', `Bearer ${token}`);
});

describe('GET /api/v1/auth/me', () => {
  let token;
  beforeEach(async () => {
    const { data, error } = await db.auth.signInWithPassword({
      email: 'forthis345@gmail.com',
      password: '12345678'
    });

    if(error) throw error;
    token = data.session.access_token;
  });

    
  it('should can display account preferences', async () => {
    const result = await supertest(app)
      .get('/api/v1/auth/me')
      .set('Authorization', `Bearer ${token}`);

    expect(result.status).toBe(200);
    expect(result.body.data.user_metadata).toBeDefined();
  })
});

})