/* eslint-env jest */

const activitiesService = require('../src/server/services/activityService')

jest.setTimeout(10000)

describe('Fetching Logged Activities', () => {
  test("Should return the expected logged activities for 'BabyLue'", async () => {
    const activities = await activitiesService.get('testUser')

    expect(activities.who === 'testUser')
    expect(`${activities.what}` === 'Invited a member')
  })
})
