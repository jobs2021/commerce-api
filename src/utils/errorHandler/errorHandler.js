import BaseError from './apiError'

class ErrorHandler {
  static handleError (res, err) {
    // log on console
    console.error(err.message, err.stack)

    // response
    const response = {
      code: err.code,
      status: err.httpCode,
      name: err.name,
      message: err.message
    }
    res.status(err.httpCode).json(response)
  }

  static isTrustedError (err) {
    if (err instanceof BaseError) return true
    return false
  }
}

export default ErrorHandler
