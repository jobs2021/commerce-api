import JWT from 'jwt-simple'
import { jwt } from 'src/config'
import { APIError } from 'src/utils/errorHandler'
import CODES from 'src/constants/errorCodes'
import LABELS from 'src/constants/labels'
import intl from 'src/utils/intl'

export default (req, res, next) => {
  try {
    // get token from headers
    const token = req.headers?.authorization.split(' ')[1]
    if (!token) throw APIError(
      CODES.BAD_REQUEST,
      intl(req.lang, LABELS.RESPONSE_BAD_REQUEST)
    )

    // decode token an get payload
    const payload = JWT.decode(token, jwt.secretKey)
    if (!payload) throw APIError(
      CODES.UNAUTHORIZED,
      intl(req.lang, LABELS.RESPONSE_UNATHORIZED)
    )

    // if success set payload on request object
    req.user = payload

    // return next middleware
    return next()
  } catch (err) {
    if (err instanceof APIError) return next(err)
    const error = new APIError(
      CODES.UNAUTHORIZED,
      intl(req.lang, LABELS.RESPONSE_UNATHORIZED)
    )
    return next(error)
  }
}
