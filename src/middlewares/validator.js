import { APIError } from 'src/utils/errorHandler'
import { validationResult, matchedData } from 'express-validator'
import ErrorNames from 'src/constants/errorCodes'

export default async (req, res, next) => {
  const errors = validationResult(req)
    if (errors.isEmpty()) {
      // set valid data to body
      req.body = matchedData(req, { locations: ['body'] })
      req.query = matchedData(req, { locations: ['query'] })
      return next()
    }
    // return with error
    return next(
      new APIError(
        ErrorNames.DATA_VALIDATION_FAILED,
        errors.array()[0].msg
      )
    )
}