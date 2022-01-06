'use strict'

export async function fetchMyGroups () {
  try {
    const response = await fetch('/myGroups/api/list') // Returns a Promise for the GET request
    // Check if the request returned a valid code
    if (!response.ok) {
      throw new Error('Failed to connect to search api and get list user groups')
    }
    // Return the response parse as JSON if code is valid
    return await response.json()
  } catch (e) {
    console.log(e)
  }
}
