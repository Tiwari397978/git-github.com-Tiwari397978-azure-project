const messageRepository = require('../repositories/message-repository').default

class MessageService {
  async getGroupMessages (req, res) {
    messageRepository.getGroupMessages(req, res)
      .then(data => {
        res.send(data) // check if this does return the group messages.
      })
  }

  async postGroupMessage (req, res) {
    messageRepository.postGroupMessage(req, res)
      .then(data => {
        res.send(data) // get a status atfer posting a message.
      })
  }
}

module.exports = new MessageService()
