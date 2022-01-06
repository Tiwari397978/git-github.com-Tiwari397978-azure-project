'use strict'

const dbQuery = require('./dbQuery').dbQuery

module.exports = {

  storeQuestions: async (username, answers) => {
    try {
      // this is clunky need to change in the future
      let sql = 'INSERT INTO [dbo].[COVID_QUESTIONS] '
      let fields = '( username, '
      let values = `VALUES ( '${username}', `
      Object.entries(answers).forEach(
        ([key, value]) => {
          fields += `${key}, `
          values += `'${value}', `
        }
      )
      fields += ') '
      values += ') '
      sql += fields + 'OUTPUT inserted.* ' + values
      sql = sql.replace(/'yes',/g, "'true',")
      sql = sql.replace(/'no',/g, "'false',")
      sql = sql.replace(/, \)/g, ' )')
      // console.log(`covid question sql query: ${sql}`)
      const result = await dbQuery(sql)
      if (result) { return true } else { return false }
    } catch (err) {
      console.log(err)
      return false
    }
  }
}
