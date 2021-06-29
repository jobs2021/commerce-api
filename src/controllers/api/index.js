import { Router } from 'express'
import auth from './auth/auth.routes'
import properties from './properties/properties.routes'

const router = new Router()

router.use('/auth', auth)
router.use('/properties', properties)

export default router
