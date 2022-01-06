const formatAMPM = (date) => {
  let hours = date.getHours()
  let minutes = date.getMinutes()
  const ampm = hours >= 12 ? 'PM' : 'AM'
  hours = hours % 12
  hours = hours || 12 // the hour '0' should be '12'
  minutes = minutes < 10 ? '0' + minutes : minutes
  const strTime = hours + ':' + minutes + ' ' + ampm
  return strTime
}

const formatDate = (date) => {
  const day = date.getDate()
  const month = date.getMonth()
  const year = date.getFullYear()

  return `${day}/${month}/${year}`
}

module.exports = { formatAMPM, formatDate }
