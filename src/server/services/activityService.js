'use strict'

const db = require('../repositories/activityRepository')

module.exports = {
  // Fetch activities from database passing a username
  get: async function get (username) {
    return await db.getActivities(username)
  }
}
