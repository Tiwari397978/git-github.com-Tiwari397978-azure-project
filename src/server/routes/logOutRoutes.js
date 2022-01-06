'use strict'

const path = require('path')
const express = require('express')

const logOutService = require('../services/logOutService')

const router = express.Router()

router.get('/', function (req, res) {
  if (req.session.isLoggedIn) {
    res.sendFile(path.join(__dirname, '../../', 'client', 'views', 'login.html'))
  } else { res.status(404).json('You need to be Logged In To Access This Page') }
})
