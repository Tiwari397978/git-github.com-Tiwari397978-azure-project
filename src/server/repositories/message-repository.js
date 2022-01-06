const dbQuery = require('./dbQuery').dbQuery

class MessageRepository {
  // ...
  constructor () { // eslint-disable-line
  }

  async getGroupMessages (req, res) {
    try {
      const messages = await dbQuery(`SELECT * FROM dbo.MESSAGES WHERE groupID=${req.params.groupID}`)
      res.send(messages)
    } catch (err) {
      console.log(err)
      res.send({ Error: err })
    }
  }

  async postGroupMessage (req, res) {
    try {
      const res = await dbQuery('INSERT INTO dbo.MESSAGES(Content,messageDate,SenderID,GroupID)' +
        `VALUES(${req.body.messageContent},${req.body.dateSent},${req.body.senderID},${req.body.groupID})`)
      res.send(res)
    } catch (err) {
      console.log(err)
      res.send({ Error: err })
    }
  }
};

module.exports = new MessageRepository()
