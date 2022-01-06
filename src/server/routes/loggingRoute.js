const express = require('express')
const router = express.Router()

const logService = require('../services/logging-service')

router.get('api/get-logs', async function (req, res) {
  if (req.session.isLoggedIn) {
    res.json(await logService.getLogs())
  } else { res.status(404).json('You need to be Logged In To Access This Page') }
})

module.exports = router
