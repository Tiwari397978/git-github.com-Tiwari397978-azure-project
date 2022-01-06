'use strict'

const covidQuestionsRepository = require('../repositories/covidQuestionsRepository')

module.exports = {

  save: async (username, answers) => {
    try {
      const result = await covidQuestionsRepository.storeQuestions(username, answers)
      return result
    } catch (err) {
      console.log(err)
    }
  }
}
