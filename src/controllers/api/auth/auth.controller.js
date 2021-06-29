import { success } from 'src/utils/response'
import Container from 'src/core/di'
import TYPES from 'src/constants/di'

const login = async (req, res, next) => {
  try {
    const authService = Container.get(TYPES.AUTH_SERVICE)
    const { email, password } = req.body

    const token = await authService.login(email, password)
    return success(res, { token })
  } catch (err) {
    console.error(err)
    return next(err)
  }
}

const signup = async (req, res, next) => {
  try {
    const authService = Container.get(TYPES.AUTH_SERVICE)

    const result = await authService.signup(req.body)
    return success(res, result)
  } catch (err) {
    console.error(err)
    return next(err)
  }
}

export default {
  login,
  signup
}
