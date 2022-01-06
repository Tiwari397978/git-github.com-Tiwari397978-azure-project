'use strict'

import('../model/myActivitiesModel.js').then(({ fetchMyActivities }) => {
  fetchMyActivities() // Fetching user activities
    .then(function (response) {
      return response
    })
    .then(function (activities) {
      const userList = document.getElementById('myActivities')
      userList.innerHTML = ''

      // Iterate through all user activities
      activities.forEach(function (action) {
        // Create a new list entry
        const li = document.createElement('LI')
        li.innerHTML = `On ${action.date_timeStamp} you ${action.what}`

        // Append the class to the list element
        li.className += 'user'

        // Append list text to list item and list item to list
        userList.appendChild(li)
      })
    })
})
