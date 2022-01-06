/* eslint-env jest */

jest.setTimeout(10000)

const delay = ms => new Promise(res => setTimeout(res, ms))

const dummy = require('../src/server/routes/userRoutes').dummy

describe('Placeholder', () => {
  test('test1', async () => {
    const result = await dummy()
    await delay(5000)
    expect(result).toBe(1)
  })
})
