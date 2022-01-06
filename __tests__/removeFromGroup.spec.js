/* eslint-env jest */
//
// ******** Tests Group exit methods *******
//

jest.setTimeout(10000)

const groupService = require('../src/server/services/groupServices')
const groupRepo = require('../src/server/repositories/groupRepository')
const viewServices = require('../src/server/services/viewGroup')
const viewGroup = require('../src/server/repositories/viewGroupRepository')

describe('Check members of the group', () => {
  test('Can check find users part of the group', async () => {
    const testGroup = {
      username: 'kaMbokazi',
      groupname: 'Hiking Champions ZA'
    }
    /// Check if group exists and add user
    const isGroupExisting = await groupRepo.get(testGroup.groupname)

    if (isGroupExisting.length === 0) {
      await groupService.createGroup(testGroup)
      await groupService.addToGroup(testGroup.username, testGroup.groupname)
    }
    await groupService.checkUser(testGroup.username, testGroup.groupname, function (isMemberIn) {
      expect(isMemberIn === true)
    })
  })

  test('Users not part of the group are not found', async () => {
    const testGroup = {
      username: 'kaMbokazi',
      groupname: 'Hiking Champions ZA'
    }
    const testUser = {
      username: 'Thobeka'
    }
    /// Check if group exists and add user
    const isGroupExisting = await groupRepo.get(testGroup.groupname)

    if (isGroupExisting.length === 0) {
      await groupService.createGroup(testGroup)
      await groupService.addToGroup(testGroup.username, testGroup.groupname)
    }
    await groupService.checkUser(testUser.username, testGroup.groupname, function (isMemberIn) {
      expect(isMemberIn === false)
    })
  })
})

describe('Members can exit the group', () => {
  test('Group member leaving the group is removed from the group members', async () => {
    const testGroup = {
      username: 'kaMbokazi',
      groupname: 'Hiking Champions ZA'
    }

    /// Check if group exists and add user
    const isGroupExisting = await groupRepo.get(testGroup.groupname)
    let isMemberInitial
    let isMemberFinal

    if (isGroupExisting.length === 0) {
      await groupService.createGroup(testGroup)
      await groupService.addToGroup(testGroup.username, testGroup.groupname)
    }

    await groupService.checkUser(testGroup.username, testGroup.groupname, function (isMemberIn) {
      isMemberInitial = isMemberIn
    })
    if (isMemberInitial) {
      groupService.leaveGroup(testGroup.groupname, testGroup.username)
      await groupService.checkUser(testGroup.username, testGroup.groupname, function (isMemberIn) {
        isMemberFinal = isMemberIn
      })
    }
    expect(isMemberFinal !== isMemberInitial)
  })
})
