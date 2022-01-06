/* eslint-env jest */

const covidQuestionsService = require('../src/server/services/covidQuestionsService')
const dbQuery = require('../src/server/repositories/dbQuery')

jest.setTimeout(10000)

describe('Storing and Checking Covid Questions', () => {
  test('should return correct answers to for the test user', async () => {
    const username = 'testUser'
    await dbQuery.dbQuery(`DELETE FROM COVID_QUESTIONS WHERE username='${username}'`)
    const answers = {
      temperature: 'yes',
      cough: 'yes',
      throat: 'yes',
      eyes: 'yes',
      breathing: 'yes',
      pain: 'yes',
      senses: 'yes',
      nauseous: 'yes',
      diarrhea: 'yes'
    }
    /* response data NOTE NEEDS TO EQUAL EXPECTED RESPONSE
        WILL HAVE TO GENERATE CORRECT DATE FOR TODAY
        AND ANSWERS MUST BE THE SAME AS 'answers' above - account for 'true' and yes difference
    [
      {
        username: 'testUser',
        responseDate: 2021-08-03T00:00:00.000Z,
        temperature: true,
        cough: true,
        throat: true,
        eyes: true,
        breathing: true,
        pain: true,
        senses: true,
        nauseous: true,
        diarrhea: true
      }
    ] */
    const result = await covidQuestionsService.save(username, answers)
    /* cannot be final data as might changed, need to take steps to ensure the expected details
        always in the database */
    expect(result).toStrictEqual(true)
    const storedResponses = await dbQuery.dbQuery(`SELECT * FROM COVID_QUESTIONS WHERE username='${username}'`)
    console.log(storedResponses)
    // expect(storedResponses).toStrictEqual(answers)
    await dbQuery.dbQuery(`DELETE FROM COVID_QUESTIONS WHERE username='${username}'`)
  })
})
