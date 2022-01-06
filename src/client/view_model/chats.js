'use strict'
import { io } from 'socket.io-client'
// import retrieveGroupMessages from '../model/chat-functions'
import { formatAMPM, formatDate } from './chat-formatting'
import { retrieveGroupMessages, getUsername } from '../model/chat-functions'

const socket = io('http://localhost:3000', { transports: ['websocket'] })
socket.on('connection', () => {
  console.log('connection made')
})
socket.on('error', console.error)
socket.on('retrieveGroupMessages', (groupID) => {
  retrieveGroupMessages(groupID)
    .then(data => console.log(data)) // display messages for respective groups.
})
socket.on('message', (data) => {
  console.log(data)
  displayRecievedMessage(data.sender, data.content, data.date)
})

socket.on('groupMessage', async (res) => {
  const sender = await getUsername()
  res.array.forEach(element => {
    if (element.sender === sender) {
      displaySentMessage(element.sender, element.content, element.date)
    } else {
      displayRecievedMessage(element.sender, element.content, element.date)
    }
  })
})

// const joinGroup = (groupName) => {
//   socket.on('subscribe', (groupID) => { // groupID is equivalent to group name in this case.
//     groupID = groupName
//   })
// }
const sendTextMessage = (msg, sender, dateObject, groupValue) => {
  console.log('Entered Send message block')
  socket.on('sendTextMessage', (data, groupName) => { // Send Message to respective group.
    data = { sender: `${sender}`, content: `${msg}`, date: dateObject }
    groupName = groupValue
  })
}

const sendButtonFunction = (groupValue) => { // This event is triggered when the send button is clicked!
  const msgTag = document.getElementById('content')
  let msg = msgTag.value
  console.log('Entered Message Block')
  console.log(`${msg}`)
  const dateObject = new Date()
  const sender = 'sino'// await getUsername()
  displaySentMessage(sender, msg, dateObject)

  msgTag.focus() // Focus on the message area when the message is sent.
  msg = '' // clear message after it is sent.
  sendTextMessage(msg, sender, dateObject, groupValue) // Call function to transmit message data
}
const testUsers = ['sinomazi', 'tikoloshi', 'slade', 'beast', 'lava', 'roques', 'kitikiti', 'samoosa']
window.addEventListener('DOMContentLoaded', (event) => {
  const groupName = document.getElementById('group-name')
  const button = document.getElementById('send-button')
  const groupSelect = document.getElementById('hiking-groups')
  const userDiv = document.getElementById('user-list-div')
  const viewMembersButton = document.getElementById('view-members')

  let groupID = ' '

  groupSelect.addEventListener('change', (event) => { // When group selection is made.
    const value = event.target.value
    groupID = `${value}`
    groupName.innerHTML = value
    socket.emit('join group', groupID)
  })
  button.addEventListener('click', () => {
    console.log('Message Sent!')

    sendButtonFunction(groupID)
  })
  viewMembersButton.addEventListener('click', () => { // View members in a group
    testUsers.forEach(element => {
      const userElement = document.createElement('li')
      userElement.innerHTML = element
      userDiv.appendChild(userElement)
    })
  })
})

const displaySentMessage = (sender, content, dateTimeObject) => {
  const timeString = formatAMPM(dateTimeObject)
  const dateString = formatDate(dateTimeObject)
  const messagesSection = document.getElementById('message-area')
  const messageDiv = document.createElement('div')
  messageDiv.setAttribute('class', 'ml-auto position-relative chat-right text-white')

  const senderDiv = document.createElement('div')
  senderDiv.setAttribute('class', 'namepadding')

  const contentDiv = document.createElement('div')
  contentDiv.setAttribute('class', 'd-flex align-items-center')

  const dateDiv = document.createElement('div')
  dateDiv.setAttribute('class', 'position-absolute bottom-0 end-0')

  const senderPTag = document.createElement('p')
  senderPTag.setAttribute('class', 'nm')

  const dateTextPTag = document.createElement('p')
  dateTextPTag.setAttribute('class', 'text-small mb-0 text-white')

  const messageText = document.createTextNode(`${content}`)
  const senderName = document.createTextNode(`${sender}`)
  const dateText = document.createTextNode(`${timeString} | ${dateString}`)

  dateTextPTag.appendChild(dateText)
  senderPTag.appendChild(senderName)

  dateDiv.appendChild(dateTextPTag)
  contentDiv.appendChild(messageText)
  senderDiv.appendChild(senderPTag)

  messageDiv.appendChild(senderPTag)
  messageDiv.appendChild(contentDiv)
  messageDiv.appendChild(dateDiv)

  const breakTag1 = document.createElement('br')
  const breakTag2 = document.createElement('br')

  messagesSection.appendChild(messageDiv)
  messagesSection.appendChild(breakTag1)
  messagesSection.appendChild(breakTag2)
}

const displayRecievedMessage = (sender, content, dateTimeObject) => {
  const timeString = formatAMPM(dateTimeObject)
  const dateString = formatDate(dateTimeObject)
  const messagesSection = document.getElementById('message-area')
  const messageDiv = document.createElement('div')
  messageDiv.setAttribute('class', 'mr-auto position-relative chat-left text-white')

  const senderDiv = document.createElement('div')
  senderDiv.setAttribute('class', 'namepadding')

  const contentDiv = document.createElement('div')
  contentDiv.setAttribute('class', 'd-flex align-items-center')

  const dateDiv = document.createElement('div')
  dateDiv.setAttribute('class', 'position-absolute bottom-0 end-0')

  const senderPTag = document.createElement('p')
  senderPTag.setAttribute('class', 'nm')

  const dateTextPTag = document.createElement('p')
  dateTextPTag.setAttribute('class', 'text-small mb-0 text-white')

  const messageText = document.createTextNode(`${content}`)
  const senderName = document.createTextNode(`${sender}`)
  const dateText = document.createTextNode(`${timeString} | ${dateString}`)

  dateTextPTag.appendChild(dateText)
  senderPTag.appendChild(senderName)

  dateDiv.appendChild(dateTextPTag)
  contentDiv.appendChild(messageText)
  senderDiv.appendChild(senderPTag)

  messageDiv.appendChild(dateDiv)
  messageDiv.appendChild(contentDiv)
  messageDiv.appendChild(senderPTag)

  const breakTag1 = document.createElement('br')
  const breakTag2 = document.createElement('br')

  messagesSection.appendChild(messageDiv)
  messagesSection.appendChild(breakTag1)
  messagesSection.appendChild(breakTag2)
}
