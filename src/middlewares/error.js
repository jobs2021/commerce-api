import { APIError, ErrorHandler } from 'src/utils/errorHandler'
import errorCodes from 'src/constants/errorCodes'

// Error Handler
export default (err, _req, res, next) => {
  // if APIError
  if (ErrorHandler.isTrustedError(err)) {
    return next(
      ErrorHandler.handleError(res, err)
    )
  }
  
  // if SyntaxError
  if (err instanceof SyntaxError) {
    const error = new APIError(
      errorCodes.BAD_REQUEST,
      'invalid syntax error expected'
    )
    return next(
      ErrorHandler.handleError(res, error)
    )
  }
  
  // TypeError
  const error = new APIError(
    errorCodes.INTERNAL_SERVER,
    'OOps! an internal error was ocurred'
  )
  return next(
    ErrorHandler.handleError(res, error)
  )
}
