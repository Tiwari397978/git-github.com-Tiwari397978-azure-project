'use strict'

/* bootstrap alert helper function
    cant
*/
const showAlert = (alertType, message, registration = false) => {
  const alertWindow = document.createElement('div')
  alertWindow.classList.add('alert', `alert-${alertType}`, 'alert-dismissible', 'fade', 'show')
  alertWindow.classList.add('position-absolute', 'start-50', 'translate-middle')

  // position will change if registration form is open
  if (registration) {
    alertWindow.classList.add('top-50')
  } else { alertWindow.classList.add('top-0', 'mt-6') }

  const boldText = document.createElement('strong')
  // appending Alert Type and Capitalizing First Letter
  const alert = document.createTextNode(`${alertType.charAt(0).toUpperCase() + alertType.slice(1)}! `)
  boldText.appendChild(alert)
  alertWindow.appendChild(boldText)

  const messageText = document.createTextNode(`${message}`)
  alertWindow.appendChild(messageText)

  // necessary bootstrap messages
  const close = document.createElement('button')
  close.setAttribute('type', 'button')
  close.setAttribute('data-bs-dismiss', 'alert')
  close.setAttribute('aria-label', 'Close')
  close.classList.add('btn-close')

  alertWindow.appendChild(close)
  if (registration) {
    document.getElementById('register-response').appendChild(alertWindow)
  } else { document.body.appendChild(alertWindow) }

  // alert will close and delete itself after 4 seconds
  setTimeout(() => { close.click() }, 4000)
}

// Add Element Event Listeners
const addEventListeners = () => {
  // password reveal/hide via radio button
  document.getElementById('login-view-password-toggle').addEventListener('click', () => {
    const viewPassToggle = document.getElementById('login-view-password-toggle')
    const viewPassToggleLabel = document.getElementById('login-view-password-toggle-label')
    const passwordField = document.getElementById('login-password')

    // clunky implementation, will change toggle button color to red in future (bootstrap issue)
    if (viewPassToggle.checked) {
      passwordField.type = 'text'
      viewPassToggleLabel.textContent = 'Viewing Password'
      // viewPassToggleLabel.style.color = '#008756'
    } else if (!viewPassToggle.checked) {
      passwordField.type = 'password'
      viewPassToggleLabel.textContent = 'Hiding Password'
      // viewPassToggleLabel.style.color = '#d9534f'
    }
  })

  // Enter button press initiates login if login input field selected
  document.getElementById('login-username').addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
      document.getElementById('login-button').click()
    }
  })
  document.getElementById('login-password').addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
      document.getElementById('login-button').click()
    }
  })

  // Send Login Information via loginModel
  import('/cdn/model/loginModel.js').then(({ postLoginDetails }) => { // eslint-disable-line
    document.getElementById('login-button').addEventListener('click', () => {
      // disabling button while request resolves
      document.getElementById('login-button').classList.add('disabled')

      const username = document.getElementById('login-username').value
      const password = document.getElementById('login-password').value
      const loginSpinner = document.getElementById('login-spinner')
      if (!username || !password) {
        document.getElementById('login-button').classList.remove('disabled')
        showAlert('warning', 'Please enter a username and a password')
      } else {
        loginSpinner.classList.remove('visually-hidden')
        postLoginDetails(username, password)
          .then((code) => {
            document.getElementById('login-button').classList.remove('disabled')
            // hiding spinner after request resolved
            loginSpinner.classList.add('visually-hidden')
            console.log(code)
            if (code instanceof Error) { showAlert('warning', code.message) } else { showAlert('success', 'You have logged in') }
          })
      }
    }, false)
  })

  document.getElementById('register-view-password-toggle').addEventListener('click', () => {
    const viewPassToggle = document.getElementById('register-view-password-toggle')
    const viewPassToggleLabel = document.getElementById('register-view-password-toggle-label')
    const passwordField = document.getElementById('register-password')
    const confirmPasswordField = document.getElementById('register-confirm-password')

    // clunky implementation, will change toggle button color to red in future (bootstrap issue)
    if (viewPassToggle.checked) {
      passwordField.type = 'text'
      confirmPasswordField.type = 'text'
      viewPassToggleLabel.textContent = 'Viewing Password'
      // viewPassToggleLabel.style.color = '#008756'
    } else if (!viewPassToggle.checked) {
      passwordField.type = 'password'
      confirmPasswordField.type = 'password'
      viewPassToggleLabel.textContent = 'Hiding Password'
      // viewPassToggleLabel.style.color = '#d9534f'
    }
  })

  /* Enter button press initiates registration if confirm password field is selected
      as it is the last field in the list */
  document.getElementById('register-confirm-password').addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
      document.getElementById('register-button').click()
    }
  })

  import('/cdn/model/registerModel.js').then(({ postRegisterDetails }) => { // eslint-disable-line
    // Send register information via registerModel
    document.getElementById('register-button').addEventListener('click', () => {
      // disabling until request is resolved
      document.getElementById('register-button').classList.add('disabled')
      const username = document.getElementById('register-username').value
      const email = document.getElementById('register-email').value

      const pass = document.getElementById('register-password').value
      const passConfirm = document.getElementById('register-confirm-password').value
      if (!username || !email || !pass || !passConfirm) {
        showAlert('warning', 'All fields are required', true)
        document.getElementById('register-button').classList.remove('disabled')
      } else if
      (pass !== passConfirm) {
        showAlert('warning', 'The provided passwords do not match', true)
        console.log('working')
        document.getElementById('register-button').classList.remove('disabled')
      } else {
        const registerSpinner = document.getElementById('register-spinner')
        // hiding spinner after request resolves
        registerSpinner.classList.remove('visually-hidden')
        postRegisterDetails(username, pass, email)
          .then((code) => {
            // restoring states
            registerSpinner.classList.add('visually-hidden')
            document.getElementById('register-button').classList.remove('disabled')
            // Add Login Elements if Registration Successful
            if (code === 'Account Registered') {
              showAlert('success', 'Account registered you can now log in')
              document.getElementById('register-close-button').click()
            } else { showAlert('warning', code, true) }
          })
      }
    }, false)
  })
}

addEventListeners()
