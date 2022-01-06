'use strict'

const dbQuery = require('./dbQuery').dbQuery

// public methods for users database access
module.exports = {
  addToGroup: async function addToGroup (username, group) {
    let sql = 'INSERT INTO [dbo].[GROUPAPPLICATIONS] (APPLICANT, GroupID, Applicationstatus)'
    sql += `VALUES ('${username}','${group}','0')`
    await dbQuery(sql)
  },

  checkApplications: async function checkApplications (username, group) {
    let sql = 'SELECT * FROM [dbo].[GROUPAPPLICATIONS]'
    sql += `WHERE APPLICANT='${username}'AND GroupID='${group}'`
    return await dbQuery(sql)
  },

  checkMembers: async function checkMembers (username, group) {
    let sql = 'SELECT * FROM [dbo].[USERGROUPS]'
    sql += `WHERE username='${username}'AND groupName='${group}'`
    return await dbQuery(sql)
  }

}
