'use strict'
const dbQuery = require('./dbQuery').dbQuery

// public methods for registering a new account
module.exports = {
  // confirm username is not already associated with an account
  uniqueUsername: async (username) => {
    try {
      const userFound = await dbQuery(`SELECT username FROM USERS WHERE username='${username}'`)
      // return bool
      return !!parseInt(userFound.length)
    } catch (err) {
      console.log(err)
    }
  },
  // confirm email is not already associated with an account
  uniqueEmail: async (email) => {
    try {
      const userFound = await dbQuery(`SELECT email FROM USERS WHERE email='${email}'`)
      // return bool
      return !!parseInt(userFound.length)
    } catch (err) {
      console.log(err)
    }
  },
  // store new account details
  createAccount: async (username, email) => {
    try {
      const accountCreated = await dbQuery('INSERT INTO USERS (username, email)' +
      'OUTPUT inserted.*' +
      `VALUES ('${username}', '${email}')`)
      // return only successfully stored values
      return accountCreated[0]
    } catch (err) {
      console.log(err)
    }
  },
  // store new password hash
  addPasswordHash: async (username, passwordHash) => {
    try {
      const addedPasswordHash = await dbQuery('INSERT INTO PASSWORDS (username, passwordHash)' +
      'OUTPUT inserted.*' +
      `VALUES ('${username}', '${passwordHash}')`)
      // return only successfully stored values
      return addedPasswordHash[0]
    } catch (err) {
      console.log(err)
    }
  },
  // delete account details associated with username
  deleteAccount: async (username) => {
    try {
      const deletedAccount = await dbQuery(`DELETE FROM USERS OUTPUT deleted.* WHERE username='${username}'`)
      // return only successfully deleted values
      return deletedAccount[0]
    } catch (err) {
      console.log(err)
    }
  }
}
