const dummyDate = new Date(2020, 11, 24, 10, 33)

const messages = [
  { messageID: 1, content: 'Sino sent a message', senderID: 2, dateTime: dummyDate, groupID: 'Jimmies' },

  { messageID: 2, content: "Sino sent another message with someone's account", senderID: 3, dateTime: dummyDate, groupID: 'Jimmies' },

  { messageID: 3, content: 'Sino sent a message', senderID: 2, dateTime: dummyDate, groupID: 'Jukes' },
  { messageID: 4, content: 'Sino sent a message', senderID: 2, dateTime: dummyDate, groupID: 'Jukes' },
  { messageID: 5, content: 'What are you doing here?', senderID: 2, dateTime: dummyDate, groupID: 'Bobby Dogs' },
  { messageID: 6, content: 'When Is the next hike?', senderID: 3, dateTime: dummyDate, groupID: 'Walking Marlins' }

]

module.exports = messages
