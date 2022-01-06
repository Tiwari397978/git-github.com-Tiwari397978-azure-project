'use strict'
const session = require('express-session')
const MSSQLStore = require('connect-mssql-v2').default
require('dotenv').config()

// specifying database server details for session store
const config = {
  user: process.env.db_username,
  password: process.env.db_password,
  server: 'eie-software-3.database.windows.net',
  database: 'Hiking',
  options: {
    encrypt: true,
    enableArithAbort: false
  }
}

// specifying session storage table
const options = {
  table: '[dbo].[SESSIONS]'
}

module.exports = {
  // creating and exporting session manager
  session: session({
    secret: process.env.sessions_secret,
    resave: false,
    saveUninitialized: false,
    cookie: {
      // time before session expires, set to 500 minutes
      maxAge: 30000000
    },
    store: new MSSQLStore(config, options)
  })
}
