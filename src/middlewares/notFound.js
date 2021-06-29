import { APIError } from 'src/utils/errorHandler'
import errorCodes from 'src/constants/errorCodes'

export default (req, res, next) => {
  return next(
    new APIError(
      errorCodes.NOT_FOUND,
      'Unable to find endpoint'
    )
  )
}
