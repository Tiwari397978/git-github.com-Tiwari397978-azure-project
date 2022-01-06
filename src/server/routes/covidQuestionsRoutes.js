// 'use strict'

const path = require('path')
const express = require('express')

const covidQuestionsService = require('../services/covidQuestionsService')

const router = express.Router()

router.get('/', function (req, res) {
  if (req.session.isLoggedIn) {
    res.sendFile(path.join(__dirname, '../../', 'client', 'views', 'covidQuestions.html'))
  } else { res.status(404).json('You need to be Logged In To Access This Page') }
})

router.post('/save', async (req, res) => {
  if (req.session.isLoggedIn) {
    const answers = req.body
    const saveResult = await covidQuestionsService.save(req.session.username, answers[0])
    if (saveResult) { res.json({ code: 'We have saved your response' }) } else { res.json({ code: 'Response already saved for today' }) }
  } else { res.status(404).json('You need to be Logged In To Access This Page') }
})

module.exports = router
