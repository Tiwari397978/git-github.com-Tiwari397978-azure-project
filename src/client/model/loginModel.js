'use strict'

export async function postLoginDetails (username, password) {
  let response = await fetch('/api/auth', {  // eslint-disable-line
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username: username,
      password: password
    })
  })
  try {
    // if response redirects go to redirected page
    if (response.redirected) {
      // waits 2 seconds before redirecting
      setTimeout(() => { window.location.href = response.url }, 2000)
    } else {
      const result = await response.json()
      if (response.ok) {
        return result.code
      } else { throw new Error(result.code) }
    }
  } catch (err) {
    return err
  }
}
