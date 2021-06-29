import { check, param, query } from 'express-validator'
import validator from 'src/middlewares/validator'
import LABELS from 'src/constants/labels'
import intl from 'src/utils/intl'
import access from 'src/utils/access'

const hasAccess = [
  param('id')
    .notEmpty()
    .withMessage((x, {req, path}) => 
      intl(req.lang, LABELS.VALIDATION_IS_EMPTY, {field: path})
    )
    .custom((value, {req}) => new Promise((resolve, reject) => {
      access.hasPropertyAccess(value, req.user.user_id)
        .then((x) => x ? resolve() : reject())
    }))
    .withMessage((x, {req, path}) => intl(req.lang, LABELS.PROPERTY_NO_ACCESS, {field: path}))
]

const create = [
  check('name')
    .notEmpty()
    .withMessage((x, {req, path}) => 
      intl(req.lang, LABELS.VALIDATION_IS_EMPTY, {field: path})
    ),

  check('long_description')
    .notEmpty()
    .withMessage((x, {req, path}) => 
      intl(req.lang, LABELS.VALIDATION_IS_EMPTY, {field: path})
    ),

  check('image')
    .notEmpty()
    .withMessage((x, {req, path}) => 
      intl(req.lang, LABELS.VALIDATION_IS_EMPTY, {field: path})
    ),

  check('extra_images')
    .optional()
    .isArray({min: 0, max: 5})
    .withMessage((x, {req, path}) => 
      intl(req.lang, LABELS.VALIDATION_MUST_BE_MAX, {field: path, value: 5})
    ),

  check('currency')
    .notEmpty()
    .withMessage((x, {req, path}) => 
      intl(req.lang, LABELS.VALIDATION_IS_EMPTY, {field: path})
    )
    .isIn(['usd', 'cad', 'eur'])
    .withMessage((x, {req, path}) => 
      intl(req.lang, LABELS.VALIDATION_MUST_BE, {field: path, value: '[usd, cad, eur]'})
    ),

  check('price')
    .notEmpty()
    .withMessage((x, {req, path}) => 
      intl(req.lang, LABELS.VALIDATION_IS_EMPTY, {field: path})
    )
    .isNumeric()
    .withMessage((x, {req, path}) => 
      intl(req.lang, LABELS.VALIDATION_MUST_BE_NUMERIC, {field: path})
    ),

  check('amenities.*.name')
    .notEmpty()
    .withMessage((x, {req, path}) => 
      intl(req.lang, LABELS.VALIDATION_IS_EMPTY, {field: path})
    ),

  check('amenities.*.value')
    .notEmpty()
    .withMessage((x, {req, path}) => 
      intl(req.lang, LABELS.VALIDATION_IS_EMPTY, {field: path})
    ),

  check('location.latitude')
    .notEmpty()
    .withMessage((x, {req, path}) => 
      intl(req.lang, LABELS.VALIDATION_IS_EMPTY, {field: path})
    ),

  check('location.longitude')
    .notEmpty()
    .withMessage((x, {req, path}) => 
      intl(req.lang, LABELS.VALIDATION_IS_EMPTY, {field: path})
    ),

  // final response errors
  validator
]

const updateById = [
    check('name')
      .optional(),
  
    check('long_description')
      .optional(),
  
    check('image')
      .optional(),
    
    check('extra_images')
      .optional(),
  
    check('currency')
      .optional()
      .isIn(['usd', 'cad', 'eur'])
      .withMessage((x, {req, path}) => 
        intl(req.lang, LABELS.VALIDATION_MUST_BE, {field: path, value: '[usd, cad, eur]'})
      ),
  
    check('price')
      .optional()
      .isNumeric()
      .withMessage((x, {req, path}) => 
        intl(req.lang, LABELS.VALIDATION_MUST_BE_NUMERIC, {field: path})
      ),
  
    check('amenities.*.name')
      .optional(),
  
    check('amenities.*.value')
      .optional(),
  
    check('location.latitude')
      .optional(),
  
    check('location.longitude')
      .optional(),
  
    // final response errors
    validator
  ]

const listByUserId = [
  query('page')
    .customSanitizer((value) => value || 1),
  
  query('filter')
    .customSanitizer((value) => value || {}),

  query('limit')
    .customSanitizer((value) => value || 10),
  
  // final response errors
  validator
]

export default {
  create,
  hasAccess,
  updateById,
  listByUserId
}
