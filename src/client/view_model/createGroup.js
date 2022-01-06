
function manage (txt) {
  const submit_btn = document.getElementById('submit-groupDetails')
  const inputElement = document.getElementsByTagName('input')

  for (let i = 0; i < inputElement.length; i++) {
    if (inputElement[i].type === 'text' && inputElement[i].value === '') {
      submit_btn.disabled = true // Disable the button.
      return false
    } else {
      submit_btn.disabled = false // Enable the button.
    }
  }
}

function validateName () {
  const groupname_ = document.getElementById('groupName_').value
  const groupField = document.getElementById('groupName_')

  if (groupname_ !== '') {
    fetch('/group/validate-groupName/' + `${groupname_}`)
      .then(function (response) {
        return response.json()
      })
      .then(function (_value) {
        if (_value) {
          document.getElementById('group-details').reset()
          groupField.setCustomValidity('Group name already exists!')
        } else {
          groupField.setCustomValidity('')
        }
      })
  }
}
