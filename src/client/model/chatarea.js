
document.addEventListener('DOMContentLoaded', function () {
  fetchGroupName()
}, false)

function fetchGroupName () {
    fetch('/group/groupName') // eslint-disable-line
    .then(function (response) {
      return response.json()
    })
    .then(function (name) {
      const groupname = document.getElementById('group-name')
      groupname.innerHTML = name[0].Groupname
    })
}

function viewGroup () {
  const groupname = document.getElementById('group-name')
  const groupName = groupname.innerHTML
  const link = document.getElementById('view-description')
  link.href = '/view/view-group:' + `${groupName}`
}

