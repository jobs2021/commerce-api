/* eslint-disable no-param-reassign */
import { injectable, inject } from 'inversify'
import ErrorCodes from 'src/constants/errorCodes'
import TYPES from 'src/constants/di'
import LABELS from 'src/constants/labels'

@injectable()
class PropertyService {
  constructor (
    @inject(TYPES.API_ERROR) APIError,
    @inject(TYPES.MONGO_CONNECTION) MongoConnection,
    @inject(TYPES.MONGO_MODELS) { Property },
    @inject(TYPES.PAGINATE) Paginate
  ) {
    this.PropertyModel = Property(MongoConnection)
    this.APIError = APIError
    this.Paginate = Paginate
  }

  async listByUserId (userId, filter = {}, options = {}) {
    try {
      const properties = await this.PropertyModel.paginate({
        ...filter,
        created_by: userId,
        status: 'active'},
        options
      )
      // contributions.docs = contributions.docs.map((x) => {
      //   return { ...x.toObject(), created_by: this.UserService.smallView(x.created_by) }
      // })
      return this.Paginate(properties)
    } catch (err) {
      if (err instanceof this.APIError) throw err
      throw new this.APIError(ErrorCodes.NOT_FOUND, LABELS.PROPERTY_ERROR_LIST)
    }
  }

  async getById (id) {
    try {
      const property = await this.PropertyModel.findOne({_id: id, status: 'active'})
      if (!property) throw new this.APIError(ErrorCodes.NOT_FOUND, LABELS.PROPERTY_NOT_FOUND)
      return property
    } catch (err) {
      if (err instanceof this.APIError) throw err
      throw new this.APIError(ErrorCodes.NOT_FOUND, LABELS.PROPERTY_NOT_FOUND)
    }
  }

  async create (payload) {
    try {
      const property = await this.PropertyModel.create(payload)
      return property
    } catch (err) {
      if (err instanceof this.APIError) throw err
      console.log(err)
      throw new this.APIError(ErrorCodes.INTERNAL_SERVER, LABELS.PROPERTY_ERROR_CREATE)
    }
  }

  async updateById (id, payload) {
    try {
      const property = await this.PropertyModel.findOne({_id: id, status: 'active'})
      if (!property) throw new this.APIError(ErrorCodes.NOT_FOUND, LABELS.PROPERTY_NOT_FOUND)
      
      Object.assign(property, payload)
      await property.save()
      return property
    } catch (err) {
      if (err instanceof this.APIError) throw err
      throw new this.APIError(ErrorCodes.INTERNAL_SERVER, LABELS.PROPERTY_ERROR_UPDATE)
    }
  }

  async deleteById (id) {
    try {
      const property = await this.getById(id)
      property.status = 'deleted'
      await property.save()
      throw new this.APIError(ErrorCodes.NO_CONTENT)
    } catch (err) {
      if (err instanceof this.APIError) throw err
      throw new this.APIError(ErrorCodes.INTERNAL_SERVER, LABELS.PROPERTY_ERROR_UPDATE)
    }
  }

  async hasAccess (propertyId, userId) {
    try {
      const property = await this.getById(propertyId)
      return property.created_by === userId
    } catch (err) {
      return false
    }
  }

}

export default PropertyService
