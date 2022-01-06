document.addEventListener('DOMContentLoaded', function () {
  getInvitations()
}, false)

function getInvitations () {
  fetch('/invitations/get-invitations')
    .then(function (response) {
      return response.json()
    })
    .then(function (messages) {
      const displayMsg = document.getElementById('display-message')
      if (messages.length === 0) {
        displayMsg.innerHTML = 'You have no invites available'
      } else {
        displayMsg.innerHTML = 'You have the following invites available: '
        makeButtons(messages.length)
        makeModals(messages)
      }
    })
}

function makeButtons (size) {
  const button_divs = document.getElementById('buttonDiv')

  for (let i = 0; i < size; ++i) {
    // making buttons
    const buttons = document.createElement('button')
    buttons.setAttribute('id', '' + `${i}`)
    buttons.setAttribute('onclick', 'getModal(this.id)')
    const button_text = document.createTextNode('See Invite')

    buttons.appendChild(button_text)
    button_divs.appendChild(buttons)
  }
}

function makeModals (messages) {
  console.log('Making Modals')

  // const modal_div = document.getElementById('modalDivision')
  const modals = document.getElementById('modalDivision')

  for (let i = 0; i < messages.length; ++i) {
    // modal div to contain the content
    const modal_div = document.createElement('div')
    modal_div.setAttribute('id', 'modal' + `${i}`)
    modal_div.setAttribute('class', 'modal')

    // Modal content div
    const modal_contentDiv = document.createElement('div')
    modal_contentDiv.setAttribute('class', 'modal-content')
    modal_div.appendChild(modal_contentDiv)

    // Span ----  Attach it to the modal
    const modal_span = document.createElement('span')
    const span_value = document.createTextNode('x')
    modal_span.setAttribute('class', 'close')
    modal_span.setAttribute('id', '' + `${i}`)
    modal_span.setAttribute('onclick', 'closeModal(this.id)')
    modal_span.appendChild(span_value)
    // Attaching span to modal content div
    modal_contentDiv.appendChild(modal_span)

    // Modal Paragraph --- Must be attached to modal content div
    const modal_message = document.createElement('p')
    const modal_textNode = document.createTextNode('' + messages[i].PopMessages)
    modal_message.appendChild(modal_textNode)
    // Attaching to modal content div
    modal_contentDiv.appendChild(modal_message)

    // Modal Buttons --- Inside the modal content div
    // -- 1
    const approveBtn = document.createElement('button')
    approveBtn.setAttribute('id', 'approve')
    approveBtn.setAttribute('value', '' + messages[i].ID)
    approveBtn.setAttribute('onclick', 'sendResponse(this.value,this.id)')
    const approveBtnText = document.createTextNode('Accept')
    approveBtn.appendChild(approveBtnText)
    modal_contentDiv.appendChild(approveBtn)
    // -- 2
    const declineBtn = document.createElement('button')
    declineBtn.setAttribute('id', 'decline')
    declineBtn.setAttribute('value', '' + messages[i].ID)
    declineBtn.setAttribute('onclick', 'sendResponse(this.value, this.id)')
    const declineBtnText = document.createTextNode('Decline')
    declineBtn.appendChild(declineBtnText)
    modal_contentDiv.appendChild(declineBtn)

    modal_div.appendChild(modal_contentDiv)

    // Append modals to modals div
    modals.appendChild(modal_div)
  }
}

function getModal (id) {
  const modal = document.getElementById('modal' + `${id}`)
  modal.style.display = 'block'
}

function sendResponse (groupID, response) {
  fetch('/invitations/respond', {

    // Adding method type
    method: 'POST',

    // Adding body or contents to send
    body: JSON.stringify({
      response: response,
      groupID: groupID
    }),

    // Adding headers to the request
    headers: {
      'Content-type': 'application/json; charset=UTF-8'
    }
  })
}

function closeModal (id) {
  const modals = document.getElementsByClassName('modal')[id]
  modals.style.display = 'none'
}
