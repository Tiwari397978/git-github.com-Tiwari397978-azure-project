'use strict'

const argon2 = require('argon2')
const loginRepository = require('../repositories/loginRepository')

// Login Service to verify user credentials
module.exports = {
  // Validates received account login details
  authoriseAccount: async (username, password) => {
    try {
      // confirming username is stored in the database
      const userFound = await loginRepository.confirmUsername(username)
      if (!userFound) { throw new Error('User does not exist') }

      // fetching password hash associated with username
      const encodedHash = await loginRepository.getPassHash(username)
      // encoding recieved password for hash verificaiton
      const encodedPassword = Buffer.from(password)
      // verifiying password hash matches received password
      const hashVerification = await argon2.verify(encodedHash, encodedPassword)

      if (hashVerification) {
        return 'valid'
      } else if (!hashVerification) {
        throw new Error('Invalid password')
      }
    } catch (err) {
      // if thrown error is due to a failed validation return details
      // do not specify reason (Brute Forcing vulnerable)
      if (err instanceof Error) { return 'Username or Password Incorrect' }
      console.log(err)
    }
  }
}
