'use strict'
const logRepo = require('../repositories/loggingRepository')

class LoggingService {
  async logOperation (user, action, operationDate) {
    try {
      const output = await logRepo.logOperation(user, action, operationDate)

      return output
    } catch (err) {
      console.log(err)
    }
  }

  async getLogs () {
    try {
      const output = await logRepo.getLogs()

      return output
    } catch (err) {
      console.log(err)
    }
  }
};

module.exports = new LoggingService()
