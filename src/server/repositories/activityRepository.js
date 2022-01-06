'use strict'

const dbQuery = require('./dbQuery').dbQuery

// public methods for users database access
module.exports = {

  getActivities: async function getActivities (username) {
    let sql = 'SELECT * FROM [dbo].[ACTIVITY_LOGS]'
    sql += `WHERE who='${username}'`
    return await dbQuery(sql)
  }

}
