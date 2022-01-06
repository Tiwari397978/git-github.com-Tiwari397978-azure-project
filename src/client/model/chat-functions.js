'use strict'

const retrieveGroupMessages = async (groupID) => {
  const response = await fetch(`http://localhost:3000/messages/get-messages:${groupID}`, { // eslint-disable-line
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }

  })
    .catch((error) => console.error('Error:', error))
  console.log(response)
  return response
}

const getUsername = async () => { // Get username based on session
  const response = await fetch('http://localhost:3000/user/api/username', { //eslint-disable-line
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  return response
}
module.exports = { retrieveGroupMessages, getUsername }
