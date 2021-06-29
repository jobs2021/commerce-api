/* eslint-disable no-param-reassign */
import { injectable, inject } from 'inversify'
import ErrorCodes from 'src/constants/errorCodes'
import TYPES from 'src/constants/di'
import LABELS from 'src/constants/labels'

@injectable()
class CryptService {
  constructor (
    @inject(TYPES.API_ERROR) APIError,
    @inject(TYPES.BCRYPT) bcrypt,
  ) {
    this.APIError = APIError
    this.Bcrypt = bcrypt
  }

  async encode (text) {
    try {
      const result = await  this.Bcrypt.hash(text, 10) // 10 = saltRounds
      return result
    } catch (err) {
      if (err instanceof this.APIError) throw err
      console.log(err)
      throw new this.APIError(ErrorCodes.INTERNAL_SERVER, LABELS.INTERNAL_SERVER)
    }
  }

  async decode (text, hash) {
    try {
      const result = await  this.Bcrypt.compare(text, hash) // 10 = saltRounds
      return result
    } catch (err) {
      if (err instanceof this.APIError) throw err
      console.log(err)
      throw new this.APIError(ErrorCodes.INTERNAL_SERVER, LABELS.INTERNAL_SERVER)
    }
  }

}

export default CryptService
