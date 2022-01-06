'use strict'

export async function fetchMyActivities () {
  try {
    // Returns a Promise for the GET request
    const response = await fetch('/activities/api/list') // eslint-disable-line 

    // Check if the request returned a valid code
    if (!response.ok) {
      throw new Error('Failed to connect to search api and get activity log')
    }
    // Return the response parse as JSON if code is valid
    return await response.json()
  } catch (e) {
    console.log(e)
  }
}
