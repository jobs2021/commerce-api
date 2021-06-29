class BaseError extends Error {
  constructor (httpCode, name, description, code) {
    super(description)
    this.code = code
    this.name = name
    this.httpCode = httpCode
  }
}

export default BaseError
