const messages = require('./message-test-data')

const postGroupMessage = (res, req) => {
  const message = req
  console.log(message)
  res = 'OK'
  return Promise.resolve(res)
}

const getGroupMessages = async (res, req) => {
  const groupID = req.groupID
  const senderID = req.senderID
  console.log(senderID)

  const messageArray = []
  const messageOneGroupOne = messages[0]
  const messageTwoGroupOne = messages[1]

  const messageOneGroupThree = messages[2]
  const messageTwoGroupThree = messages[3]

  if (groupID === 1) {
    messageArray.push(messageOneGroupOne, messageTwoGroupOne)
    res = messageArray
  }
  if (groupID === 3) {
    messageArray.push(messageOneGroupThree, messageTwoGroupThree)
    res = messageArray
  }

  return Promise.resolve(res)
}

module.exports = [postGroupMessage, getGroupMessages]
