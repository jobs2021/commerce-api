import { APIError, ErrorHandler } from 'src/utils/errorHandler'
import errorCodes from 'src/constants/errorCodes'
import LABELS from 'src/constants/labels'
import intl from 'src/utils/intl'

// Error Handler
export default (err, req, res, next) => {
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
      intl(req.lang, LABELS.RESPONSE_SYNTAX_ERROR)
    )
    return next(
      ErrorHandler.handleError(res, error)
    )
  }
  
  // TypeError
  const error = new APIError(
    errorCodes.INTERNAL_SERVER,
    intl(req.lang, LABELS.RESPONSE_INTERNAL_ERROR)
  )
  return next(
    ErrorHandler.handleError(res, error)
  )
}
