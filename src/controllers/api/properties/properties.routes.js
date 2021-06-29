import { Router } from 'express'
import auth from 'src/middlewares/auth'
import controller from './properties.controller'
import validations from './properties.validations'

const router = new Router()

router
  .route('/')
  .post(auth, validations.create, controller.create)
  .get(auth, validations.hasAccess, controller.listByUserId)

router
  .route('/:id')
  .get(auth, validations.hasAccess, controller.getById)
  .put(auth, validations.hasAccess, validations.updateById, controller.updateById)
  .delete(auth, validations.hasAccess, validations.listByUserId, controller.deteleById)

// router
//   .route('/signup')
//   .post(validations.signup, controller.signup)

export default router
