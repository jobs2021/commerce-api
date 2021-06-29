/* eslint-disable no-param-reassign */
import { injectable, inject } from 'inversify'
import ErrorCodes from 'src/constants/errorCodes'
import TYPES from 'src/constants/di'
import LABELS from 'src/constants/labels'

@injectable()
class AuthService {
  constructor (
    @inject(TYPES.API_ERROR) APIError,
    @inject(TYPES.MONGO_CONNECTION) MongoConnection,
    @inject(TYPES.USER_SERVICE) UserService,
    @inject(TYPES.MONGO_MODELS) { User },
    @inject(TYPES.JWT_SERVICE) JWTService,
    @inject(TYPES.CRYPT_SERVICE) CryptService
  ) {
    this.UserModel = User(MongoConnection)
    this.APIError = APIError
    this.UserService = UserService
    this.JWTService = JWTService
    this.CryptService = CryptService
  }

  async login (email, password) {
    try {
      const user = await this.UserService.getByEmail(email)

      // validate password
      const isValid = await this.CryptService.decode(password, user.password)
      if (!isValid) throw new this.APIError(ErrorCodes.UNAUTHORIZED, LABELS.AUTH_ERROR_INVALID_CREDENTIALS)
      
      // generate token
      const token = await this.JWTService.encode(user)
      return token
    } catch (err) {
      if (err instanceof this.APIError) throw err
      console.log(err)
      throw new this.APIError(ErrorCodes.UNAUTHORIZED, LABELS.AUTH_ERROR_INVALID_CREDENTIALS)
    }
  }

  async signup (payload) {
    try {
      // encode password
      payload.password = await this.CryptService.encode(payload.password)
      
      const user = await this.UserService.create(payload)
      const token = await this.JWTService.encode(user)
      const result = { ...user.toObject(), token }
      delete result.password
      return result
    } catch (err) {
      if (err instanceof this.APIError) throw err
      console.log(err)
      throw new this.APIError(ErrorCodes.UNAUTHORIZED, LABELS.AUTH_ERROR_SINGUP)
    }
  }
}

export default AuthService
