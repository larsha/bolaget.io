function toNumber (value) {
  return parseInt(value, 10) || null
}

function stringToBool (str) {
  return str === 'true'
}

function capitalize (str) {
  let string = str.trim()

  return string ? `${string[0].toUpperCase()}${string.slice(1).toLowerCase()}` : ''
}

function empty (str) {
  return Boolean(str)
}

function numberToBool (value) {
  return !!parseInt(value)
}

function listToArray (list) {
  return list.split(',')
}

function fuzzyMatch (prop, query) {
  let match = {
    [prop]: {
      query,
      fuzziness: 'AUTO'
    }
  }

  return { match }
}

function rangeMatch (prop, from, to) {
  let match = {
    range: {
      [prop]: {
        boost: 2.0
      }
    }
  }

  if (from) {
    match.range[prop].gte = from
  }

  if (to) {
    match.range[prop].lte = to
  }

  return match
}

export { stringToBool, capitalize, empty, toNumber, numberToBool, fuzzyMatch, rangeMatch, listToArray }
