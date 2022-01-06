'use strict'

const dbQuery = require('./dbQuery').dbQuery

// public methods for log in
module.exports = {
  // return password hash associated with username
  getPassHash: async (username) => {
    try {
      const encodedHash = await dbQuery(`SELECT * FROM [dbo].[PASSWORDS] WHERE username = '${username}'`)
      // return only password hash
      return encodedHash[0].passwordHash
    } catch (err) {
      console.log(err)
    }
  },
  confirmUsername: async (username) => {
    // confirm username is associated with an account
    const userFound = await dbQuery(`SELECT * FROM PASSWORDS WHERE username='${username}'`)
    // return bool
    return !!parseInt(userFound.length)
  }
}
