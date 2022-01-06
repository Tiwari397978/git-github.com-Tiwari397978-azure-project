'use strict'

const db = require('../repositories/invitationRepository.js')

module.exports =
{
  getMessages: async function getMessages (username, callback) {
    const result = await db.getMessages(username)
    callback(result)
  },
  sendResponse: async function sendResponse (groupID) {
    await db.sendResponse(groupID)
  },
  addToApplications: async function addToApplications (username, groupID) {
    await db.addToApplications(username)
  }

}
