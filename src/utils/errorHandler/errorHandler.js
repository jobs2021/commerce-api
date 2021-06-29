import intl from 'src/utils/intl'
import BaseError from './apiError'

class ErrorHandler {
  static handleError (res, err) {    
    // response
    const response = {
      code: err.code,
      status: err.httpCode,
      name: err.name,
      message: intl(res.lang, err.message)
    }
    res.status(err.httpCode).json(response)
  }

  static isTrustedError (err) {
    if (err instanceof BaseError) return true
    return false
  }
}

export default ErrorHandler
