function stringToBool (str) {
  return str === 'true'
}

function fuzzySearch (str) {
  return new RegExp(`.*${escape(str)}.*`, 'i')
}

export { stringToBool, fuzzySearch }
