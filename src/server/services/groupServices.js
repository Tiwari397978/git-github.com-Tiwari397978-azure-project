'use strict'

const db = require('../repositories/groupRepository.js')

module.exports =
{
  createGroup: async function createGroup (group) {
    return await db.create(group)
  },

  addToGroup: async function addToGroup (user, group) {
    return await db.addToGroup(user, group)
  },

  saveName: async function saveName (group) {
    return await db.saveName(group)
  },

  deleteName: async function deleteName () {
    return await db.deleteName()
  },

  isGroupNameAvailable: async function isGroupNameAvailable (groupName, callback) {
    const result = await db.get(groupName)
    if (result.length === 0) { callback(false) } else { callback(true) }
  },

  getLast: async function getLast (callback) {
    const result = await db.getLast()
    if (result) callback(result)
  },

  getName: async function getName (callback) {
    const result = await db.getName()
    callback(result)
  },

  getGroupList: async function getGroupList (callback) {
    const result = await db.getList()
    if (result.length !== 0) callback(result)
  },
  addToInvites: async function addToInvites (username, groupname) {
    return await db.addToInvites(username, groupname)
  },
  createInvitation: async function createInvitation (username, groupname) {
    return await db.createInvitation(username, groupname)
  },
  removeUser: async function removeUser (removeRequest) {
    return await db.removeUser(removeRequest)
  },
  leaveGroup: async function leaveGroup (groupname, username) {
    return await db.leaveGroup(groupname, username)
  },
  checkUser: async function checkUser (username, groupname, callback) {
    const result = await db.checkUser(username, groupname)
    if (result.length === 0) { callback(false) } else { callback(true) } // false - Not in group
  }

}
