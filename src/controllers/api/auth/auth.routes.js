import { Router } from 'express'
import controller from './auth.controller'
import validations from './auth.validations'

const router = new Router()

router
  .route('/login')
  .post(validations.login, controller.login)

router
  .route('/signup')
  .post(validations.signup, controller.signup)

export default router
