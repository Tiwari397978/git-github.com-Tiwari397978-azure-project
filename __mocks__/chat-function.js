// async retrieveGroupMessages(groupID) {
//   const dummyDate = new Date()
//   const messageArray = []
//   const messageOneGroupOne = { messageID: 1, content: 'Sino sent a message', senderID: 2, dateTime: dummyDate, groupID: 1 }
//   const messageTwoGroupOne = { messageID: 1, content: "Sino sent another message with someone's account", senderID: 3, dateTime: dummyDate, groupID: 1 }

//   const messageOneGroupThree = { messageID: 1, content: 'Sino sent a message', senderID: 2, dateTime: dummyDate, groupID: 3 }
//   const messageTwoGroupThree = { messageID: 1, content: 'Sino sent a message', senderID: 2, dateTime: dummyDate, groupID: 3 }

//   if (groupID === 1) {
//     messageArray.push(messageOneGroupOne, messageTwoGroupOne)
//   }
//   if (groupID === 3) {
//     messageArray.push(messageOneGroupThree, messageTwoGroupThree)
//   }

//   return Promise.resolve(messageArray)

// }
