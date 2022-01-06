'use strict'

export async function postCovidAnswers (answers) {
  let response = await fetch('/covid-questions/save', {  // eslint-disable-line
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(answers)
  })
  try {
    const result = await response.json()
    if (response.ok) {
      alert(result.code) // eslint-disable-line
    } else { throw new Error(result.code) }
  } catch (err) {
      alert(err)  // eslint-disable-line
  }
}
