'use strict'

const e = require('cors')
const express = require('express')
const path = require('path')

const inviteService = require('../services/inviteServices.js')

const router = express.Router()

const dummy = () => {
  return 1
}

router.get('/', function (req, res) {
  // confirm user is logged in via session
  if (req.session.isLoggedIn) {
    res.sendFile(path.join(__dirname, '../', '../', 'client', 'views', 'invitation.html'))
  // respond with not found if user not logged in
  } else { res.status(404).json('You need to be Logged In To Access This Page') }
})

router.get('/get-invitations', function (req, res) {
  // confirm user is logged in via session
  if (req.session.isLoggedIn) {
    inviteService.getMessages(req.session.username, function (messages) {
      res.send(messages)
    })
  } else { res.status(404).json('You need to be Logged In To Access This Page') }
})

router.post('/respond', function (req, res) {
  if (req.session.isLoggedIn) {
    inviteService.sendResponse(req.body.groupID)
    if (req.body.response === 'approve') {
      inviteService.addToApplications(req.session.username, req.body.groupID)
    }
  } else { res.status(404).json('You need to be Logged In To Access This Page') }
})

module.exports = { router, dummy }
