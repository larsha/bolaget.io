import escape from 'escape-string-regexp'

function stringToBool (str) {
  return str === 'true'
}

function fuzzySearch (str) {
  return new RegExp(`.*${escape(str)}.*`, 'i')
}

function capitalize (str) {
  let string = str.trim()

  return string ? `${string[0].toUpperCase()}${string.slice(1).toLowerCase()}` : ''
}

function caseInsensitive (str) {
  return new RegExp(`^${escape(str)}$`, 'i')
}

function empty (str) {
  return Boolean(str)
}

export { stringToBool, fuzzySearch, capitalize, caseInsensitive, empty }
