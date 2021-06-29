import httpCodes from './httpCodes'
import BaseError from './baseError'

class APIError extends BaseError {
  static httpCodes = httpCodes

  constructor ( httpCodeName, description = 'internal server error', code = 0 ) {
    const http = httpCodes[httpCodeName] || httpCodes.INTERNAL_SERVER
    super(http.status, http.name, description, code)
  }
}

export default APIError
