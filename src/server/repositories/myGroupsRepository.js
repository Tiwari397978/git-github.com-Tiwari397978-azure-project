'use strict'

const dbQuery = require('./dbQuery').dbQuery

// public methods for user groups database access
module.exports = {
  getMyGroups: async (username) => {
    let sql = 'SELECT groupName FROM dbo.USERGROUPS WHERE '
    sql += `username='${username}'`
    return await dbQuery(sql)
  }
}
