'use strict'

let groupname

document.addEventListener('DOMContentLoaded', function () {
  fetch('/group/groupName') // eslint-disable-line
    .then(function (response) {
      return response.json()
    })
    .then(function (name) {
      groupname = name[0].Groupname
      getUsers(groupname)
    })
}, false)

function getUsers (groupName) {
  fetch(`/view/fetch-details:${groupName}`) // eslint-disable-line
    .then(function (response) {
      return response.json()
    })
    .then(function (users) {
      const username = users[1]

      const userList = document.getElementById('members')
      userList.innerHTML = ''

      // Iterate through all usernames
      for (let i = 0; i < username.length; ++i) {
      // Create a new list entry
        const li = document.createElement('LI')

        const temp = `<a href = '#' onclick="(${removeMember})('${username[i].username}')"> ${username[i].username} </a>`
        const rating = `${username[i].rating}`
        li.innerHTML = temp + ' ------- Rating = ' + rating
        // Append the class to the list element
        li.className += 'user'

        // Append list text to list item and list item to list
        userList.appendChild(li)
      }
    })
}

async function removeMember (user) {
// Check active use -- Cannot remove themselves
  let activeUser

fetch('/user/api/username') // eslint-disable-line
    .then(function (response) {
      return response.json()
    })
    .then(function (activeUser) {
      if (activeUser !== user) {
        if (document.getElementById('remove-member')) {
          document.getElementById('remove-member').remove()
        }
        if (document.getElementById('reason-form')) {
          document.getElementById('reason-form').remove()
        }
        if (document.getElementById('leave-group')) {
          document.getElementById('leave-group').remove()
        }

        const btn = document.createElement('button')
        btn.innerHTML = `Remove ${user} `
        btn.id = 'remove-member'
        document.body.appendChild(btn)

        btn.onclick = function () {
          if (document.getElementById('reason-form')) {
            document.getElementById('reason-form').remove()
          }
          const reasonForm = document.createElement('form')
          reasonForm.setAttribute('id', 'reason-form')
          reasonForm.setAttribute('method', 'post')
          reasonForm.setAttribute('action', '/group/remove')

          const username = document.createElement('input')
          username.setAttribute('type', 'text')
          username.setAttribute('name', 'username')
          username.setAttribute('value', `${user}`)
          reasonForm.appendChild(username)

          const reason = document.createElement('input')
          reason.setAttribute('type', 'text')
          reason.setAttribute('name', 'reason')
          reason.setAttribute('placeholder', 'Reason for removing ' + `${user}`)
          reason.setAttribute('minlength', '10')
          reason.setAttribute('maxlength', '250')
          reasonForm.appendChild(reason)

          const submitBtn = document.createElement('input')
          submitBtn.setAttribute('type', 'submit')
          submitBtn.setAttribute('value', 'Submit')
          submitBtn.onclick = function () {
            alert('Your request has been submited')
          }
          reasonForm.appendChild(submitBtn)
          document.body.appendChild(reasonForm)
        }
      } else {
        if (document.getElementById('leave-group')) {
          document.getElementById('leave-group').remove()
        }
        if (document.getElementById('remove-member')) {
          document.getElementById('remove-member').remove()
        }
        if (document.getElementById('reason-form')) {
          document.getElementById('reason-form').remove()
        }

        const leaveBtn = document.createElement('button')
        leaveBtn.innerHTML = 'Leave Group'
        leaveBtn.id = 'leave-group'
        leaveBtn.onclick = function () {
          alert('You left the group!') // eslint-disable-line
          fetch('/group/leave/' + `${groupname}`) // eslint-disable-line
        }
        document.body.appendChild(leaveBtn)
      }
    })
}
