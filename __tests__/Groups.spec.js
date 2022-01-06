/* eslint-env jest */
//
// ******** Tests Group methods *******
//

jest.setTimeout(10000)

const groupService = require('../src/server/services/groupServices')
const groupRepo = require('../src/server/repositories/groupRepository')

describe('Adding group to database', () => {
  test('Group is added to database', async () => {
    const testName = {
      groupName: 'Hikers A Champions',
      description: 'We hike around Johanesburg Parktown',
      location: 'Johannesburg Parktown North'

    }
    const isGroupExisting = await groupRepo.get(testName.groupName)
    let group

    if (isGroupExisting.length === 0) { await groupService.createGroup(testName) } else {
      group = await groupRepo.get(testName.groupName)
    }
    expect(group[0].groupName === testName.groupName)
  })
})

describe('Can check for existing group names', () => {
  test('Existing group names found in database', async () => {
    const testName = {
      groupName: 'Hikers A Champions',
      description: 'We hike around Johanesburg Parktown',
      location: 'Johannesburg Parktown North'

    }
    const isGroupExisting = await groupRepo.get(testName.groupName)
    let isGroupNameAvailable

    if (isGroupExisting.length === 0) { await groupService.createGroup(testName) } else {
      await groupService.isGroupNameAvailable(testName.groupName, function (result) {
        isGroupNameAvailable = result
      })
    }
    expect(isGroupNameAvailable === true)
  })

  test('Non-existing group names not found in database', async () => {
    const testName = {
      groupName: 'Hikers A Champions',
      description: 'We hike around Johanesburg Parktown',
      location: 'Johannesburg Parktown North'

    }
    const mockName = 'Hikers B Champions'
    const isGroupExisting = await groupRepo.get(testName.groupName)
    let isGroupNameAvailable

    if (isGroupExisting.length === 0) { await groupService.createGroup(testName.groupName) } else {
      await groupService.isGroupNameAvailable(mockName, function (result) {
        isGroupNameAvailable = result
      })
    }
    expect(isGroupNameAvailable === false)
  })
})
