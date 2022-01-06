
document.addEventListener('DOMContentLoaded', function () {
  fetchGroups()
}, false)

function fetchGroups () {
  fetch('/group/groupList') // eslint-disable-line
    .then(function (response) {
      return response.json()
    })
    .then(function (_value) {
      makeTable(_value)
    })
}

function makeTable (groups) {
  const GroupNames = []
  const GroupLocation = []

  const tableLength = groups.length

  const groupsTable = document.createElement('table')
  groupsTable.setAttribute('id', 'groupsTable')

  const headerRow = document.createElement('tr')
  headerRow.setAttribute('class', 'header')

  const header1 = document.createElement('th')
  header1.setAttribute('style', 'width:70%')
  header1.innerHTML = 'Name'
  headerRow.appendChild(header1)

  const header2 = document.createElement('th')
  header2.setAttribute('style', 'width:70%')
  header2.innerHTML = 'Location'
  headerRow.appendChild(header2)

  groupsTable.appendChild(headerRow)

  for (let i = 0; i < tableLength; ++i) {
    const tableRows = document.createElement('tr')


    GroupNames[i] = `<a href = '#' onclick="(${joinGroupButton})('${groups[i].groupName}')"> ${groups[i].groupName} </a>`
    GroupLocation[i] = groups[i].generalLocation

    const nameCol = document.createElement('td')
    nameCol.innerHTML = GroupNames[i]

    const locationCol = document.createElement('td')
    locationCol.innerHTML = GroupLocation[i]

    tableRows.appendChild(nameCol)
    tableRows.appendChild(locationCol)

    groupsTable.appendChild(tableRows)
  }

  document.getElementsByTagName('body')[0].appendChild(groupsTable)
}


function searchFunction () { // eslint-disable-line
  const input = document.getElementById('search-text')
  const filter = input.value.toUpperCase()
  const table = document.getElementById('groupsTable')
  const tr = table.getElementsByTagName('tr')
  let td

  for (let i = 0; i < tr.length; i++) {
    switch (document.getElementById('options').value) {
      case ('groupName'):
        td = tr[i].getElementsByTagName('td')[0]
        break
      case ('groupLocation'):
        td = tr[i].getElementsByTagName('td')[1]
        break
    }
    if (td) {
      const textValue = td.textContent || td.innerText

      if (textValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = ''
      } else {
        tr[i].style.display = 'none'
      }
    }
  }
}

async function joinGroupButton (group) {
  await applied(group)
  if (document.getElementById('join')) {
    document.getElementById('join').remove()
  }
  if (!status) {
    const btn = document.createElement('button')
    btn.innerHTML = `Join ${group} `
    btn.id = 'join'
    btn.onclick = function () {
      document.getElementById('join').remove()
      logRequest(group)
    }
    document.body.appendChild(btn)
  } else {
    alert('Cannot join this group') // eslint-disable-line
  }
}

async function logRequest (groupID) {
  fetch('/group/api/apply/' + `${groupID}`) // eslint-disable-line
    .then(function (response) {
      return response.json()
    })
}
let status
async function applied (groupID) {
  await fetch('/group/api/check/' + `${groupID}`) // eslint-disable-line
    .then(function (response) {
      return response.json()
    })
    .then(function (response) {
      status = response
      return status
    })
}
