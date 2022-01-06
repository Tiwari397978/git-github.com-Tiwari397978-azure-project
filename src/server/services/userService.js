'use strict'

const db = require('../repositories/userRepository')

// Services required to access list of users
module.exports = {
  // gets all users from the databaase
  getAll: async () => {
    return await db.getAllUsers()
  }
}
