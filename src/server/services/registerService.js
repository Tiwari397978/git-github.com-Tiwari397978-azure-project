'use strict'

const argon2 = require('argon2')
const registerRepository = require('../repositories/registerRepository')

// Registration Service for account creation
module.exports = {
  createAccount: async (username, password, email) => {
    // Registration Details constraint checking
    try {
      // username cannot be less than 4 characters or more than 20
      if (username.length < 4 || username.length > 20) { throw new Error('Invalid username length') }
      /*
      regular expressions to check username:
      - starts with an alphabet character
      - can contain only alphanumeric characters and underscore _ or dash -
      */
      const usernameRegex = /^([a-zA-Z])[a-zA-Z_-]*[\w_-]*[\S]$|^([a-zA-Z])[0-9_-]*[\S]$|^[a-zA-Z]*[\S]$/
      // validating username format using regular expression
      const validUsername = username.match(usernameRegex)
      if (!validUsername) { throw new Error('Invalid username format') }
      const userFound = await registerRepository.uniqueUsername(username)
      // Confirms username is not already in use
      if (userFound) { throw new Error('Username already registered') }

      // regular expressions to check email - RFC 822 standard
      const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      // validateing email format using regular expression
      const validEmail = email.match(emailRegex)
      if (!validEmail) { throw new Error('Invalid email') }
      const emailFound = await registerRepository.uniqueEmail(email)
      // Confirms username is not already in use
      if (emailFound) { throw new Error('Email already registered') }

      /*
      regular expressions to check password
      Can Contain:
      - alphanumeric characters
      - special characters: !@#$%^*&/
      - spaces
      Must Contain (at least one):
      - Capital letter
      - Lower Case letter
      - Number
      */
      if (password.length < 8) { throw new Error('Invalid password length') }
      // validateing password format using regular expression
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*/])(?=.{7,})/
      const validPassword = password.match(passwordRegex)
      if (!validPassword) { throw new Error('Invalid password') }
    } catch (err) {
      // if thrown error is due to format constraint violations return violation details
      if (err instanceof Error) { return err.message }
      // logging thrown error
      console.log(err)
    }
    try {
      // store new account details in database and returning stored details on success
      const createdAccount = await registerRepository.createAccount(username, email)
      // confirming stored details are correct
      if (createdAccount.username !== username || createdAccount.email !== email) {
        throw new Error('Could not add account details to database')
      }

      // hashing password for storeage
      const passwordHash = await argon2.hash(password)
      // storing hashed password in database and returning values stored
      const addedPasswordHash = await registerRepository.addPasswordHash(username, passwordHash)

      // confirming stored password hash and username is correect
      if (addedPasswordHash.username !== username || addedPasswordHash.passwordHash !== passwordHash) {
        // deleteing account details associated with unsuccessfully password hash
        const deletedAccount = await registerRepository.deleteAccount(username)
        // confirming deletion of account
        if (deletedAccount.username !== username || deletedAccount.passwordHash !== passwordHash) {
          throw new Error('Could not store passwordHash - account creation rolled back')
        } else {
        // continuing to raise password hash storage error if account deletion fails
          throw new Error('Could not store passwordHash - could NOT roll back account creation!')
        }
      }
      return 'valid'
    } catch (err) {
      // if thrown error is a database error -> return registration failure message
      if (err instanceof Error) { return 'Could not register account' }
      // logging thrown error
      console.log(err)
    }
  }
}
