'use strict'

const db = require('../repositories/myGroupsRepository')

// Services required to access list user groups
module.exports = {
  // gets all user groups from the databaase
  getAll: async (username) => {
    return await db.getMyGroups(username)
  }
}
