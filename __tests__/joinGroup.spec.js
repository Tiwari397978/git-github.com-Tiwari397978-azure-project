/* eslint-env jest */

const applicationService = require('../src/server/services/applicationService')

jest.setTimeout(10000)

describe('Checking if the user has applied or is already a group member', () => {
  test('Should return true if the user is already a member', async () => {
    await applicationService.hasApplied('BabyLue', 'Hiking for Fun', function (hasApplied) {
      expect(hasApplied).toBe(true)
    })
  })

  test('Should return true if the user has already applied', async () => {
    await applicationService.hasApplied('BabyLue', 'Exclusive Hikers', function (hasApplied) {
      expect(hasApplied).toBe(true)
    })
  })

  test('Should return false if the user hasnt applied', async () => {
    await applicationService.hasApplied('BabyLue', 'Serious Hikers', function (hasApplied) {
      expect(hasApplied).toBe(false)
    })
  })
})
