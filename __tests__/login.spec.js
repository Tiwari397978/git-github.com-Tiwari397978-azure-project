/* eslint-env jest */

const request = require('supertest')
const { app } = require('../src/app/app')

jest.setTimeout(10000)

describe('Login Verification', () => {
  test('Incorrect Username', async () => {
    const response = await request(app)
      .post('/api/auth')
      .type('json')
      .send({
        username: '*($^%*$',
        password: 'Password1!'
      })
      .redirects(0)

    expect(response.statusCode).toBe(400)
    expect(response.body.code).toBe('Username or Password Incorrect')
  })

  describe('Incorrect Password', () => {
    test("It should return status 400 and 'Username or Password Incorrect' message", async () => {
      const response = await request(app)
        .post('/api/auth')
        .type('json')
        .send({
          username: 'testUser',
          password: 'foo'
        })
        .redirects(0)

      expect(response.statusCode).toBe(400)
      expect(response.body.code).toBe('Username or Password Incorrect')
    })
  })

  describe('Access Denied Without Logging In', () => {
    test('It should return status 400', async () => {
      const response = await request(app)
        .get('/home')
        .type('json')
        .redirects(0)

      expect(response.statusCode).toBe(404)
    })
  })

  // describe('Correct Login Details', () => {
  //   test('It should return status 301 and redirect', async () => {
  //     const response = await request(app)
  //       .post('/api/auth')
  //       .send({
  //         username: 'testUser',
  //         password: 'Password1!'
  //       })
  //       .redirects(0)

  //     expect(response.statusCode).toBe(301)
  //     expect(response.redirect).toBe(true)
  //   })
  // })

  describe('Session Log In Status Tracking', () => {
    test('It should return status 200 and not redirect', async () => {
      const response = await request(app)
        .get('/home')
        .send({
          username: 'testUser',
          password: 'Password1!'
        })
        .redirects(0)
      // expect(response.statusCode).toBe(200) - requires home page implementation
      expect(response.redirect).toBe(false)
    })
  })
})
