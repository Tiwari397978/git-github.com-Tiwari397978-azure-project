'use strict'

export async function fetchUserList () {
  const config = {
    method: 'get', // specify method to use
    headers: { // headers to specify the type of data needed
      'Content-Type': 'application/json'
    }
  }
  try {
    const response = await fetch('/user/api/list') // Returns a Promise for the GET request
    // Check if the request returned a valid code
    if (!response.ok) {
      throw new Error('Failed to connect to search api and get list of users')
    }
    // Return the response parse as JSON if code is valid
    return await response.json()
  } catch (e) {
    console.log(e)
  }
}
