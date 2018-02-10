export function toNumber (value) {
  const parsed = parseInt(value, 10)
  if (isNaN(parsed)) {
    return null
  }

  return parsed
}

export function randomString () {
  return Math.random().toString(36).substring(2, 15)
}

export function stringToBool (str) {
  return str === 'true'
}

export function capitalize (str) {
  let string = str.trim()

  return string ? `${string[0].toUpperCase()}${string.slice(1).toLowerCase()}` : ''
}

export function notEmpty (str = '') {
  return str.trim().length > 0
}

export function numberToBool (value) {
  const parsed = parseInt(value, 0)
  if (isNaN(parsed)) {
    return null
  }

  return !!parsed
}

export function listToArray (list) {
  return list.split(',')
}

export async function sleep (sec = 10) {
  return new Promise(r => setTimeout(r, sec * 1000))
}

export function fuzzyMatch (prop, query) {
  let match = {
    [prop]: {
      query,
      fuzziness: 'AUTO'
    }
  }

  return { match }
}

export function rangeMatch (prop, from, to) {
  let match = { range: { [prop]: {} } }

  if (from) {
    match.range[prop].gte = from
  }

  if (to) {
    match.range[prop].lte = to
  }

  return match
}
