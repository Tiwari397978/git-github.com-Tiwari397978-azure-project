'use strict'

const express = require('express')
const path = require('path')
const fs = require('fs')

const viewGroup = require('../services/viewGroup.js')
const groupService = require('../services/groupServices.js')

const router = express.Router()

// added wild card to specify groupName when sending groupPage file
router.get('/view-group::groupName', function (req, res) {
  // confirm user is logged in via session
  if (req.session.isLoggedIn) {
    const groupName = req.params.groupName
    const pagePath = path.join(__dirname, '../', '../', 'client', 'views', 'groupPage.html')

    /*
      // This is a HACK and needs to be changed once the client files are properly separated into the agreed upon model
      */
    // reads groupPage.html file and stores in string
    let data = fs.readFileSync(pagePath, 'utf8')
    if (data) {
      // replaces groupName constant with the created groupName (look at groupName.html for details)
      data = data.replace('groupNamePlaceholder', groupName)

      // sends the edited groupPage.html to client
      res.send(data)
    }
    // groupService.deleteName()
    // respond with not found if user not logged in
  } else { res.status(404).json('You need to be Logged In To Access This Page') }
})

// added wild card to specify the name of the group when retrieving group details
router.get('/fetch-details::groupName', async function (req, res) {
  // confirm user is logged in via session
  if (req.session.isLoggedIn) {
    const groupName = req.params.groupName
    const groupDetails = await viewGroup.getGroupDetails(groupName)
    res.send(groupDetails)
    // respond with not found if user not logged in
  } else { res.status(404).json('You need to be Logged In To Access This Page') }
})

router.get('/view-members', function (req, res) {
  res.sendFile(path.join(__dirname, '../../', 'client', 'views', 'groupMembers.html'))
})

router.get('/getQuestions', function (req, res) {
  console.log('Here')
  res.sendFile(path.join(__dirname, '/src/', 'client', 'views', 'covidQuestions.html'))
})

// /fetch-details
module.exports = router
