const express = require('express')
const path = require('path')
// controllers
const MessageService = require('../services/message-service')

const router = express.Router()

router.get('/', (req, res) => {
  if (req.session.isLoggedIn) {
    res.sendFile(path.join(__dirname, '../../', 'client', 'views', 'chatarea.html'))
  // respond with not found if user not logged in
  } else { res.status(404).json('You need to be Logged In To Access This Page') }
})
// defaults to sending login/registration page
router.get('/get-messages::groupID', (req, res) => {
  // redirect to home page if confirmed user already logged in via session
  if (req.session.isLoggedIn) {
    MessageService.getGroupMessages(req, res)
  } else { res.status(404).json('You need to be Logged In To Access This Page') }
})

router.post('/save', (req, res) => {
  // confirm user is logged in via session
  if (req.session.isLoggedIn) {
    MessageService.postGroupMessage(req, res)
    // respond with not found if user not logged in
  } else { res.status(404).json('You need to be Logged In To Access This Page') }
})

module.exports = router
