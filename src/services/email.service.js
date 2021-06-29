/* eslint-disable no-param-reassign */
import { injectable, inject } from 'inversify'
import ErrorCodes from 'src/constants/errorCodes'
import TYPES from 'src/constants/di'
import LABELS from 'src/constants/labels'

@injectable()
class EmailService {
  constructor (
    @inject(TYPES.API_ERROR) APIError,
    @inject(TYPES.AXIOS) Axios,
    @inject(TYPES.CONFIGS) configs,
  ) {
    this.APIError = APIError
    this.Axios = Axios
    this.Enpoint = `${configs.emailEnpoint}/api/emails/send`
    this.AccessToken = configs.xAccessToken
  }

  async send (payload) {
    try {
      // encode password
      const headers = { 'x-access-token': this.AccessToken }
      const request = await this.Axios.post(this.Enpoint, payload, { headers })
      return request.data
    } catch (err) {
      if (err instanceof this.APIError) throw err
      console.log(err)
      throw new this.APIError(ErrorCodes.INTERNAL_SERVER, LABELS.EMAIL_ERROR_SEND)
    }
  }
}

export default EmailService
