'use strict'

const { getRatings } = require('../repositories/viewGroupRepository.js')
const db = require('../repositories/viewGroupRepository.js')

module.exports = {
  getGroupDetails: async function getGroupDetails (groupName) {
    // getting group details and user in group
    const result = await db.getDetails(groupName)
    // getting ratings of users in group
    const users = await getRatings(result[1])
    // removing list of users in group
    result.pop()
    // add list of user (and ratings) in group
    result.push(users)
    if (result !== '') { return result } else { return [{}] }
  }
}
