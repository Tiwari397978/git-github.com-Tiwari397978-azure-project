'use strict'

export async function postRegisterDetails (username, password, email) {
  let response = await fetch('/api/register', {  // eslint-disable-line
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username: username,
      password: password,
      email: email
    })
  })
  try {
    const result = await response.json()
    if (response.ok) {
      return result.code
    } else { throw new Error(result.code) }
  } catch (err) {
    return err.message
  }
}
