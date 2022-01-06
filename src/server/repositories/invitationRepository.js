'use strict'

const dbQuery = require('./dbQuery.js')

module.exports =
{
  getMessages: async function getMessages (username) {
    let sql = 'SELECT PopMessages, Username, ID FROM dbo.INVITATIONMESSAGES WHERE '
    sql += `Username = '${username}' AND MessageStatus = 'unseen'`
    return await dbQuery.dbQuery(sql)
  },
  sendResponse: async function sendResponse (groupID) {
    let sql = 'DELETE FROM dbo.INVITATIONMESSAGES WHERE '
    sql += `ID = '${groupID}'`
    return await dbQuery.dbQuery(sql)
  },
  addToApplications: async function addToApplications (username, groupID) {
    const status = 0
    let sql = 'INSERT INTO dbo.GROUPAPPLICATIONS (APPLICANT, GroupID, ApplicationStatus) '
    sql += `VALUES ('${username}','${groupID}','${status}')`
    return await dbQuery.dbQuery(sql)
  }
}
