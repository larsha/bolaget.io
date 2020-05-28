import crypto from 'crypto'

export function toNumber(value) {
  const parsed = parseInt(value, 10)
  if (isNaN(parsed)) {
    return null
  }

  return parsed
}

export function randomString() {
  return crypto.randomBytes(32).toString('hex')
}

export function stringToBool(str) {
  return str === 'true'
}

export function capitalize(str) {
  const string = str.trim()

  return string
    ? `${string[0].toUpperCase()}${string.slice(1).toLowerCase()}`
    : ''
}

export function notEmpty(str) {
  return Boolean(str)
}

export function numberToBool(value) {
  const parsed = parseInt(value, 0)
  if (isNaN(parsed)) {
    return null
  }

  return !!parsed
}

export function listToArray(list) {
  return list.split(',')
}

export async function sleep(sec = 10) {
  return new Promise((resolve, reject) => setTimeout(resolve, sec * 1000))
}

export function fuzzyMatch(prop, query) {
  const match = {
    [prop]: {
      query,
      fuzziness: 'AUTO',
    },
  }

  return { match }
}

export function rangeMatch(prop, from, to) {
  const match = { range: { [prop]: {} } }

  if (from) {
    match.range[prop].gte = from
  }

  if (to) {
    match.range[prop].lte = to
  }

  return match
}
