'use strict'

const path = require('path')
const express = require('express')
const activityService = require('../services/activityService')
const router = express.Router()

router.get('/', function (req, res) {
  // confirm user is logged in via session
  if (req.session.isLoggedIn) {
  // Serve activities html page (from views)
    res.sendFile(path.join(__dirname, '../../', 'client', 'views', 'myActivies.html'))
  // respond with not found if user not logged in
  } else { res.status(404).json('You need to be Logged In To Access This Page') }
})

router.get('/api/list', async function (req, res) {
  // confirm user is logged in via session
  if (req.session.isLoggedIn) {
    // get and send data to the client side
    activityService.get(req.session.username)
      .then((data) => {
        res.json(data)
      })
    // respond with not found if user not logged in
  } else { res.status(404).json('You need to be Logged In To Access This Page') }
})

module.exports = router
