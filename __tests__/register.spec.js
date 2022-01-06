/* eslint-env jest */

const request = require('supertest')
const { app } = require('../src/app/app')

jest.setTimeout(10000)

describe('Registration Username Verification', () => {
  describe('Username Not Unique', () => {
    test("It should return a 400 status and 'Username already registered' message", async () => {
      const response = await request(app)
        .post('/api/register')
        .type('json')
        .send({
          username: 'testUser',
          email: ' ',
          password: ' '
        })
        .redirects(0)

      expect(response.statusCode).toBe(400)
      expect(response.body.code).toBe('Username already registered')
    })
  })

  describe('Use of forbidden characters', () => {
    test("It should return a 400 status and 'Invalid username format' message", async () => {
      const body = {
        username: 'a))(#*$',
        email: 'Invalid email',
        password: 'Invalid password'
      }
      const response = await request(app)
        .post('/api/register')
        .type('json')
        .send(body)
        .redirects(0)
      expect(response.statusCode).toBe(400)
      expect(response.body.code).toBe('Invalid username format')
    })
  })

  describe('Invalid Username Length - too short', () => {
    test("It should return a 400 status and 'Invalid username length' message", async () => {
      const body = {
        username: 'li',
        email: 'Invalid email',
        password: 'Invalid password'
      }
      const response = await request(app)
        .post('/api/register')
        .type('json')
        .send(body)
        .redirects(0)
      expect(response.statusCode).toBe(400)
      expect(response.body.code).toBe('Invalid username length')
    })
  })

  describe('Invalid Username Length - too long', () => {
    test("It should return a 400 status and 'Invalid username length' message", async () => {
      const body = {
        username: 'testUsertestUsertestUser',
        email: 'Invalid email',
        password: 'Invalid password'
      }
      const response = await request(app)
        .post('/api/register')
        .type('json')
        .send(body)
        .redirects(0)
      expect(response.statusCode).toBe(400)
      expect(response.body.code).toBe('Invalid username length')
    })
  })
  describe('Invalid Username Format - does not start with alphabet character', () => {
    test("It should return a 400 status and 'Invalid username format' message", async () => {
      const body = {
        username: '_test',
        email: 'Invalid email',
        password: 'Invalid password'
      }
      const response = await request(app)
        .post('/api/register')
        .type('json')
        .send(body)
        .redirects(0)
      expect(response.statusCode).toBe(400)
      expect(response.body.code).toBe('Invalid username format')
    })
  })
  describe('Valid Username Format', () => {
    test("It should return a 400 status and 'Invalid email' as username check passed", async () => { // need to reserve 'test' username
      const body = {
        username: 'test',
        email: 'Invalid email',
        password: 'Invalid password'
      }
      const response = await request(app)
        .post('/api/register')
        .type('json')
        .send(body)
        .redirects(0)
      expect(response.statusCode).toBe(400)
      expect(response.body.code).toBe('Invalid email')
    })
  })
})

describe('Registration Email Verification', () => {
  describe("Invalid Email Format - no '@' character", () => {
    test("It should return a 400 status and 'Invalid email' message", async () => {
      const body = {
        username: 'test',
        email: 'example.com',
        password: 'Invalid password'
      }
      const response = await request(app)
        .post('/api/register')
        .type('json')
        .send(body)
        .redirects(0)
      expect(response.statusCode).toBe(400)
      expect(response.body.code).toBe('Invalid email')
    })
  })

  describe("Invalid Email Format - only one '@' character allowed", () => {
    test("It should return a 400 status and 'Invalid email' message", async () => {
      const body = {
        username: 'test',
        email: 'ex@am@pl@e.com',
        password: 'Invalid password'
      }
      const response = await request(app)
        .post('/api/register')
        .type('json')
        .send(body)
        .redirects(0)
      expect(response.statusCode).toBe(400)
      expect(response.body.code).toBe('Invalid email')
    })
  })

  describe('Invalid Email Format - no use of special characters', () => {
    test("It should return a 400 status and 'Invalid email' message", async () => {
      const body = {
        username: 'test',
        email: 'b(c)d,e:f;gi[]l@domain.com',
        password: 'Invalid password'
      }
      const response = await request(app)
        .post('/api/register')
        .type('json')
        .send(body)
        .redirects(0)
      expect(response.statusCode).toBe(400)
      expect(response.body.code).toBe('Invalid email')
    })
  })

  describe("Invalid Email Format - double dot before '@' symbol", () => {
    test("It should return a 400 status and 'Invalid email' message", async () => {
      const body = {
        username: 'test',
        email: '..test@domain.com',
        password: 'Invalid password'
      }
      const response = await request(app)
        .post('/api/register')
        .type('json')
        .send(body)
        .redirects(0)
      expect(response.statusCode).toBe(400)
      expect(response.body.code).toBe('Invalid email')
    })
  })

  describe("Invalid Email Format - double dot after '@' symbol", () => {
    test("It should return a 400 status and 'Invalid email' message", async () => {
      const body = {
        username: 'test',
        email: 'test@domain..com',
        password: 'Invalid password'
      }
      const response = await request(app)
        .post('/api/register')
        .type('json')
        .send(body)
        .redirects(0)
      expect(response.statusCode).toBe(400)
      expect(response.body.code).toBe('Invalid email')
    })
  })

  describe('Valid email', () => {
    test("It should return a 400 status and 'Invalid password' message as email check passed", async () => { // reserve 'test@domain.com' email
      const body = {
        username: 'test',
        email: 'test@domain.com',
        password: 'Invalid password'
      }
      const response = await request(app)
        .post('/api/register')
        .type('json')
        .send(body)
        .redirects(0)
      expect(response.statusCode).toBe(400)
      expect(response.body.code).toBe('Invalid password')
    })
  })
})

describe('Registration Password Verification', () => {
  describe('Does not contain a capital letter', () => {
    test("It should return a 400 status and 'Invalid password' message", async () => {
      const body = {
        username: 'test',
        email: 'test@domain.com',
        password: 'password1'
      }
      const response = await request(app)
        .post('/api/register')
        .type('json')
        .send(body)
        .redirects(0)
      expect(response.statusCode).toBe(400)
      expect(response.body.code).toBe('Invalid password')
    })
  })

  describe('Does not containt a lower case letter', () => {
    test("It should return a 400 status and 'Invalid password' message", async () => {
      const body = {
        username: 'test',
        email: 'test@domain.com',
        password: 'PASSWORD1'
      }
      const response = await request(app)
        .post('/api/register')
        .type('json')
        .send(body)
        .redirects(0)
      expect(response.statusCode).toBe(400)
      expect(response.body.code).toBe('Invalid password')
    })
  })

  describe('Does not contain a number', () => {
    test("It should return a 400 status and 'Invalid password' message", async () => {
      const body = {
        username: 'test',
        email: 'test@domain.com',
        password: 'Password1'
      }
      const response = await request(app)
        .post('/api/register')
        .type('json')
        .send(body)
        .redirects(0)
      expect(response.statusCode).toBe(400)
      expect(response.body.code).toBe('Invalid password')
    })
  })
})
