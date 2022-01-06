'use strict'

// selected option helper function
const getResponse = (id) => {
  const response = document.getElementById(id)
  return response.options[response.selectedIndex].value
}

import('/cdn/model/covidQuestionsModel.js').then(({ postCovidAnswers }) => { // eslint-disable-line
  const submit = document.getElementById('submitButton')
  submit.addEventListener('click', () => {
    const responses = [{}]

    responses[0].temperature = getResponse('temperature')
    responses[0].cough = getResponse('cough')
    responses[0].throat = getResponse('throat')
    responses[0].eyes = getResponse('eyes')
    responses[0].breathing = getResponse('breathing')
    responses[0].pain = getResponse('pain')
    responses[0].senses = getResponse('senses')
    responses[0].nauseous = getResponse('nauseous')
    responses[0].diarrhea = getResponse('diarrhea')

    postCovidAnswers(responses)
  }, false)
})
