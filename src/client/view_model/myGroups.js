'use strict'

document.addEventListener('DOMContentLoaded', function () {
  fetch('/group/deleteName')
}, false)

import('../model/myGroupsModel.js').then(({ fetchMyGroups }) => {
  fetchMyGroups()
    .then(function (response) {
      return response
    })
    .then(function (groups) {
      const userList = document.getElementById('myGroups')
      userList.innerHTML = ''

      // Iterate through all students
      groups.forEach(function (group) {
        // Create a new list entry
        const li = document.createElement('LI')
        const text = `${group.groupName}`
        const a = document.createElement('a')
        a.href = '/group/group-homePage/' + text
        // a.href = '/view/view-group' + text
        a.textContent = text

        // Append the class to the list element
        li.className += 'user'

        // Append list text to list item and list item to list
        li.appendChild(a)
        userList.appendChild(li)
      })
    })
})
