import { check } from 'express-validator'
import validator from 'src/middlewares/validator'
import LABELS from 'src/constants/labels'
import intl from 'src/utils/intl'

const login = [
  check('email')
    .notEmpty()
    .withMessage((x, {req, path}) => 
      intl(req.lang, LABELS.VALIDATION_IS_EMPTY, {field: path})
    ),

  check('password')
    .notEmpty()
    .withMessage((x, {req, path}) => 
      intl(req.lang, LABELS.VALIDATION_IS_EMPTY, {field: path})
    ),

  // final response errors
  validator
]

const signup = [
  check('first_name')
    .notEmpty()
    .withMessage((x, {req, path}) => 
      intl(req.lang, LABELS.VALIDATION_IS_EMPTY, {field: path})
    ),
  
  check('last_name')
    .notEmpty()
    .withMessage((x, {req, path}) => 
      intl(req.lang, LABELS.VALIDATION_IS_EMPTY, {field: path})
    ),

  check('email')
    .notEmpty()
    .withMessage((x, {req, path}) => 
      intl(req.lang, LABELS.VALIDATION_IS_EMPTY, {field: path})
    ).isEmail()
    .withMessage((x, {req, path}) => 
      intl(req.lang, LABELS.VALIDATION_MUST_BE_EMAIL, {field: path})
    ),

  check('password')
    .notEmpty()
    .withMessage((x, {req, path}) => 
      intl(req.lang, LABELS.VALIDATION_IS_EMPTY, {field: path})
    ),

  check('confirm_password')
    .notEmpty()
    .withMessage((x, {req, path}) => 
      intl(req.lang, LABELS.VALIDATION_IS_EMPTY, {field: path})
    ),

  check('password')
    .custom((value, {req}) => value === req.body.confirm_password)
    .withMessage((x, {req, path}) => 
      intl(req.lang, LABELS.VALIDATION_PASSWORD_NO_MATCH, {field: path})
    ),

  // final response errors
  validator
]

export default {
  login,
  signup
}
