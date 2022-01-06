'use strict'

const path = require('path')
const express = require('express')
const loginService = require('../services/loginService')
const registerService = require('../services/registerService')
// const logoutService = require('../services/loginOut')
const logservice = require('../services/logging-service')
const router = express.Router()

// defaults to sending login/registration page
router.get('/', (req, res) => {
  // redirect to home page if confirmed user already logged in via session
  if (req.session.isLoggedIn) {
    res.redirect(req.baseUrl + '/home')
  } else {
    res.sendFile(path.join(__dirname, '../../', 'client', 'views', 'login.html'))
  }
})

// Login call to check if user details are correct
router.post('/api/auth', async (req, res) => {
  // res.sendStatus(200)
  const { username, password } = req.body
  const authResult = await loginService.authoriseAccount(username, password)
  if (authResult !== 'valid') {
    // return error status and error reason
    res.status(400).json({ code: authResult })
  } else {
    // save log in status to session
    req.session.isLoggedIn = true
    // save username in session
    req.session.username = username
    // save user login activity
    const operationDate = new Date()
    logservice.logOperation(req.session.username, 'logged in', operationDate)
    // save new session information
    req.session.save(async (err) => {
      if (err) {
        res.end('session save error: ' + err)
      }
      // redirect to home page after log in
      res.redirect(301, req.baseUrl + '/home')
    })
  }
})

// Return home page
router.get('/home', (req, res) => {
  // confirm user is logged in via session
  if (req.session.isLoggedIn) {
    res.sendFile(path.join(__dirname, '../../', 'client', 'views', 'home.html'))
  // respond with not found if user not logged in
  } else { res.status(404).json('You need to be Logged In To Access This Page, Refresh the page if you think this is an error') }
})

// // Register call to create user accouint
router.post('/api/register', async (req, res) => {
  const { username, password, email } = req.body
  // register new account details
  const regResult = await registerService.createAccount(username, password, email)
  if (regResult !== 'valid') {
    // return error status and error reason
    res.status(400).json({ code: regResult })
  } else {
    // return result of attempt to register
    res.json({ code: 'Account Registered' })
    const operationDate = new Date()
    logservice.logOperation(username, 'Created an account', operationDate)
  }
})

// Logging out of the app.
router.get('/logout', (req, res) => {
  // confirm user is logged in via session
  if (req.session.isLoggedIn) {
    res.header('Cache-Control', 'no-cache')

    req.session.destroy((err) => {
      if (err) {
        return console.log(err)
      }
      res.sendFile(path.join(__dirname, '../../', 'client', 'views', 'login.html'))
    })
  } else { // respond with not found if user not logged in
    res.status(404).json('You need to be Logged In To Access This Page, Refresh the page if you think this is an error')
  }
})

module.exports = router
