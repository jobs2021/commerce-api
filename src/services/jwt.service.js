/* eslint-disable no-param-reassign */
import { injectable, inject } from 'inversify'
import ErrorCodes from 'src/constants/errorCodes'
import TYPES from 'src/constants/di'

@injectable()
class JWTService {
  constructor (
    @inject(TYPES.API_ERROR) APIError,
    @inject(TYPES.JWT) jwt,
    @inject(TYPES.MOMENT) Moment,
    @inject(TYPES.CONFIGS) configs
  ) {
    this.JWT = jwt
    this.APIError = APIError
    this.JWTConfigs = configs.jwt
    this.Moment = Moment
  }

  async encode (user) {
    try {
      const { iss, aud, secretKey } =  this.JWTConfigs
      const payload = {
        user_id: user._id,
        first_name: user.name,
        last_name: user.last_name,
        email: user.email,
        iss,
        aud,
        iat: this.Moment().unix(),
        nbf: this.Moment().unix()
      }
      const result = this.JWT.encode(payload, secretKey)
      return result
    } catch (err) {
      if (err instanceof this.APIError) throw err
      console.log(err)
      throw new this.APIError(ErrorCodes.INTERNAL_SERVER, `Oops! al generar credenciales`)
    }
  }

  async decode (token) {
    try {
      const result = this.JWT.decode(token, this.JWTConfigs.secretKey)
      return result
    } catch (err) {
      if (err instanceof this.APIError) throw err
      console.log(err)
      throw new this.APIError(ErrorCodes.INTERNAL_SERVER, `Oops! error al decodificar las credenciales`)
    }
  }

}

export default JWTService
