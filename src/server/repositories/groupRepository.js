'use strict'

const dbQuery = require('./dbQuery.js')

module.exports =
{
  create: async function create (group) {
    let sql = 'INSERT INTO dbo.GROUPS (groupName,groupDescription,generalLocation)'
    sql += `VALUES ('${group.groupName}','${group.description}','${group.location}')`
    return await dbQuery.dbQuery(sql)
  },

  addToGroup: async function addToGroup (user, group) {
    let sql = 'INSERT INTO [dbo].[USERGROUPS] (username, groupName)'
    sql += `VALUES ('${user}','${group.groupName}')`
    return await dbQuery.dbQuery(sql)
  },

  saveName: async function saveName (group) {
    let sql = 'INSERT INTO [dbo].[GROUPNAME] (Groupname)'
    sql += `VALUES ('${group}')`
    return await dbQuery.dbQuery(sql)
  },

  deleteName: async function deleteName () {
    const sql = 'DELETE FROM [dbo].[GROUPNAME]'
    return await dbQuery.dbQuery(sql)
  },

  get: async function get (group) {
    let sql = 'SELECT * FROM dbo.GROUPS WHERE '
    sql += `groupName='${group}'`
    return await dbQuery.dbQuery(sql)
  },

  getName: async function getName (group) {
    const sql = 'SELECT * FROM dbo.GROUPNAME'
    return await dbQuery.dbQuery(sql)
  },

  getLast: async function getLast () {
    const sql = 'SELECT TOP (1) [groupName]  FROM [dbo].[GROUPS]'
    return await dbQuery.dbQuery(sql)
  },

  getList: async function getList (filter) {
    const sql = 'SELECT * FROM dbo.GROUPS'
    return await dbQuery.dbQuery(sql)
  },

  addToInvites: async function addToInvites (username, groupname) {
    let sql = 'INSERT INTO dbo.INVITES (GroupName, Invitee, InvitationStatus)'
    sql += `VALUES ('${groupname}', '${username}', 'Pending')`

    return await dbQuery.dbQuery(sql)
  },
  createInvitation: async function createInvitation (username, groupname) {
    const message = `${username} has invited you to join the ${groupname} group!`
    const status = 'unseen'

    let sql = 'INSERT INTO dbo.INVITATIONMESSAGES (Username, Groupname, PopMessages,MessageStatus)'
    sql += `VALUES ('${username}','${groupname}','${message}','${status}')`

    return await dbQuery.dbQuery(sql)
  },

  removeUser: async function removeUser (removeRequest) {
    let sql = 'INSERT INTO dbo.REMOVEREQUEST (Username, Reason) '
    sql += `VALUES ('${removeRequest.username}', '${removeRequest.reason}')`
    return await dbQuery.dbQuery(sql)
  },

  leaveGroup: async function leaveGroup (groupname, username) {
    let sql = 'DELETE FROM dbo.USERGROUPS WHERE '
    sql += `username = '${username}' AND groupName = '${groupname}'`
    return await dbQuery.dbQuery(sql)
  },

  checkUser: async function checkUser (username, groupname) {
    let sql = 'SELECT * FROM dbo.USERGROUPS WHERE '
    sql += `username ='${username}' AND groupName = '${groupname}'`
    return await dbQuery.dbQuery(sql)
  }

}
