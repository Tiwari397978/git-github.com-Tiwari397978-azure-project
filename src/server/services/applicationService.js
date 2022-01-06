'use strict'

const db = require('../repositories/applicationRepository')

module.exports = {
  addToGroup: async function addToGroup (user, group) {
    return await db.addToGroup(user, group)
  },
  hasApplied: async function hasApplied (user, group, callback) {
    const applicant = await db.checkApplications(user, group)
    const member = await db.checkMembers(user, group)
    if (applicant.length === 0 && member.length === 0) { callback(false) } else { callback(true) } // eslint-disable-line
  }
}
