/* eslint-disable no-param-reassign */
import { injectable, inject } from 'inversify'
import ErrorCodes from 'src/constants/errorCodes'
import TYPES from 'src/constants/di'
import LABELS from 'src/constants/labels'

@injectable()
class UserService {
  constructor (
    @inject(TYPES.API_ERROR) APIError,
    @inject(TYPES.MONGO_CONNECTION) MongoConnection,
    @inject(TYPES.MONGO_MODELS) { User },
    @inject(TYPES.PAGINATE) Paginate
  ) {
    this.UserModel = User(MongoConnection)
    this.APIError = APIError
    this.Paginate = Paginate
  }

  async getByEmail (email) {
    try {
      const user = await this.UserModel.findOne({email})
      if (!user) throw new this.APIError(ErrorCodes.NOT_FOUND, LABELS.AUTH_USER_NOT_FOUND)
      return user
    } catch (err) {
      if (err instanceof this.APIError) throw err
      console.log(err)
      throw new this.APIError(ErrorCodes.INTERNAL_SERVER, LABELS.AUTH_ERROR_RETRIVE_USER)
    }
  }

  async getById (id) {
    try {
      const user = await this.UserModel.findOne({_id: id})
      if (!user) throw new this.APIError(ErrorCodes.NOT_FOUND, LABELS.AUTH_USER_NOT_FOUND)
      return user
    } catch (err) {
      if (err instanceof this.APIError) throw err
      console.log(err)
      throw new this.APIError(ErrorCodes.INTERNAL_SERVER, LABELS.AUTH_ERROR_RETRIVE_USER)
    }
  }

  async create (payload) {
    try {
      const user = await this.UserModel.create(payload)
      return user
    } catch (err) {
      if (err instanceof this.APIError) throw err
      console.log(err)
      if (err.code === 11000) throw new this.APIError(
        ErrorCodes.DATA_VALIDATION_FAILED,
        LABELS.AUTH_ERROR_USER_ALREADY_REGISTERED
      )
      throw new this.APIError(ErrorCodes.INTERNAL_SERVER, LABELS.AUTH_ERROR_SINGUP)
    }
  }

  async updateById (id, payload) {
    try {
      const user = await this.UserModel.findOne({_id: id})
      if (!user) throw new this.APIError(ErrorCodes.NOT_FOUND, LABELS.AUTH_USER_NOT_FOUND)
      
      Object.assign(user, payload)
      await user.save()
      return user
    } catch (err) {
      if (err instanceof this.APIError) throw err
      console.log(err)
      throw new this.APIError(ErrorCodes.INTERNAL_SERVER, LABELS.AUTH_ERROR_RETRIVE_USER)
    }
  }

}

export default UserService
