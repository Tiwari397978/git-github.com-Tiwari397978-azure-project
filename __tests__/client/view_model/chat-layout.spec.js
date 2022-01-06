/* eslint-env jest */
const assert = require('assert')
const format = require('../../../src/client/view_model/chat-formatting')

describe('Format chat time', function () {
  test('returns AM time', () => {
    const d = new Date(2018, 11, 24, 10, 33)

    const timeString = format.formatAMPM(d)

    assert(timeString, '10:33 AM')
  })

  test('returns PM time', () => {
    const d = new Date(2018, 11, 24, 22, 33)

    const timeString = format.formatAMPM(d)

    assert(timeString, '10:33 PM')
  })
})

describe('Format chat date', () => {
  test('returns slash separated date', () => {
    const d = new Date(2018, 11, 24, 10, 33)

    const dateString = format.formatDate(d)

    assert(dateString, '24/11/2018')
  })
})
