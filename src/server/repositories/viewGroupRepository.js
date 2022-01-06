'use strict'

const dbQuery = require('./dbQuery.js').dbQuery

module.exports = {
  getDetails: async (groupName) => {
    let sql = `SELECT * FROM [dbo].[GROUPS] WHERE groupName= '${groupName}'`
    const result = await dbQuery(sql)

    // fetching list of members in group and appending to result
    sql = `SELECT username FROM [dbo].[USERGROUPS] WHERE groupName = '${groupName}'`

    // running query
    const usernames = await dbQuery(sql)
    result.push(usernames)
    return result
  },
  getRatings: async (usernames) => {
    let sqlList = '( '
    usernames.forEach((user) => {
      sqlList += `'${user.username}', `
    })
    // removing extra ', ' from query string
    sqlList = sqlList.substring(0, sqlList.length - 2)
    sqlList += ' )'
    const sql = `SELECT username, rating FROM [dbo].[USERS] WHERE username IN ${sqlList}`
    return await dbQuery(sql)
  }
}
