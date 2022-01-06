'use strict'

const path = require('path')
const express = require('express')
const myGroupsService = require('../services/myGroupsService')
const router = express.Router()

// loading my groups page
router.get('/', function (req, res) {
  // confirm user is logged in via session
  if (req.session.isLoggedIn) {
    res.sendFile(path.join(__dirname, '../../', 'client', 'views', 'myGroups.html'))
  // respond with not found if user not logged in
  } else { res.status(404).json('You need to be Logged In To Access This Page') }
})

// fetching groups
router.get('/api/list', function (req, res) {
  // confirm user is logged in via session
  if (req.session.isLoggedIn) {
    myGroupsService.getAll(req.session.username) // req.body.username
      .then((data) => {
        res.json(data)
      })
    // respond with not found if user not logged in
  } else { res.status(404).json('You need to be Logged In To Access This Page, Refreshing The Page Might Help') }
})

module.exports = router
