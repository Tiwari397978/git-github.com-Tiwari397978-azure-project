'use strict'

const dbQuery = require('./dbQuery.js')

class LoggingRepository {
  async logOperation (user, content, date) {
    try {
      const operation = await dbQuery(`INSERT INTO [dbo].[ACTIVITY_LOGS] 
     (who, what, date_timeStamp) VALUES(${user}, ${content}, ${date})`)
      return operation[0]
    } catch (err) {
      console.log(err)
    }
  }

  async getLogs () {
    try {
      const logs = await dbQuery('SELECT who, what, date_timeStamp FROM dbo.ACTIVITY_LOGS')
      return logs[0]
    } catch (err) {
      console.log(err)
    }
  }
}

module.exports = new LoggingRepository()
