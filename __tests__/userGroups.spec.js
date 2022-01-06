/* eslint-env jest */

const viewGroupService = require('../src/server/services/viewGroup')

jest.setTimeout(10000)

describe('Fetching Group Details', () => {
  test("Should return the expected group details for the 'Hiking For Fun' group", async () => {
    const fetchedGroupDetails = await viewGroupService.getGroupDetails('Hiking for Fun')
    /* cannot be final data as might changed, need to take steps to ensure the expected details
        always in the database */
    const expectedGroupDetails =
    [{
      groupName: 'Hiking For Fun',
      groupDescription: 'We like to run and are very relaxed about it',
      generalLocation: 'Johannesburg area and surroundings'
    },
    [{ username: 'BabyLue', rating: 50 }, { username: 'JAllsop', rating: 50 }]]
    expect(fetchedGroupDetails).toStrictEqual(expectedGroupDetails)
  })
})
