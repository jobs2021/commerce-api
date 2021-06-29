const getType = (value) => Object.prototype.toString.call(value)

const isNumber = (value) => {
  if (getType(value) === '[object Number]') return true
  return false
}

const isObject = (value) => {
  if (getType(value) === '[object Object]') return true
  return false
}

const isArray = (value) => {
  if (getType(value) === '[object Array]') return true
  return false
}

const isUpperCase = (value) => {
  return value === value.toUpperCase()
}

export {
  isNumber, isObject, isArray, isUpperCase
}
