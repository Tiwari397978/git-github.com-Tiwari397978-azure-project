/* eslint-env jest */
//
// ******** Tests Group methods *******
//

jest.setTimeout(10000)

const groupService = require('../src/server/services/groupServices')
const invitationService = require('../src/server/services/inviteServices')

describe('Invitation is sent/logged for sending', () => {
  test('Invite logged into database for receival by invitee', async () => {
    const testInvitation = {
      username: 'kaMbokazi',
      groupname: 'Hikers A Champions'

    }

    // Getting current user messages
    let oldMessages
    await invitationService.getMessages(testInvitation.username, function (result) {
      oldMessages = result
    })
    // Creating new Invite
    await groupService.createInvitation(testInvitation.username, testInvitation.groupname)

    let newMessages
    // Checking if there is  new message for user
    await invitationService.getMessages(testInvitation.username, function (result) {
      newMessages = result
    })
    expect(newMessages.length === oldMessages.length + 1)
  })
})

describe('Invitation is deleted upon response', () => {
  test('Invite is deleted after being responded to by the invitee', async () => {
    const testInvitation = {
      username: 'kaMbokazi',
      groupname: 'Hikers A Champions'

    }

    // Getting current user messages
    let oldMessages
    await invitationService.getMessages(testInvitation.username, function (result) {
      oldMessages = result
    })

    // Get one group id to respond to
    const group_id = oldMessages[0].ID

    // Respond to one Invite
    await invitationService.sendResponse(group_id)

    let newMessages
    // Checking if message got deleted
    await invitationService.getMessages(testInvitation.username, function (result) {
      newMessages = result
    })
    expect(newMessages.length === oldMessages.length - 1)
  })
})
