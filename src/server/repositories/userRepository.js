'use strict'

const dbQuery = require('./dbQuery').dbQuery

// public methods for users database access
module.exports = {
  getAllUsers: async () => {
    const sql = 'SELECT * FROM dbo.USERS'
    return await dbQuery(sql)
  }
}
