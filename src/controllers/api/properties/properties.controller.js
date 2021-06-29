import { success } from 'src/utils/response'
import Container from 'src/core/di'
import TYPES from 'src/constants/di'

const listByUserId = async (req, res, next) => {
  try {
    const { page, limit, filter } = req.query
    const propertyService = Container.get(TYPES.PROPERTY_SERVICE)

    const result = await propertyService.listByUserId(req.user.user_id, filter, { page, limit })
    return success(res, result)
  } catch (err) {
    console.error(err)
    return next(err)
  }
}

const getById = async (req, res, next) => {
  try {
    const propertyService = Container.get(TYPES.PROPERTY_SERVICE)

    const result = await propertyService.getById(req.params.id)
    return success(res, result)
  } catch (err) {
    console.error(err)
    return next(err)
  }
}

const create = async (req, res, next) => {
  try {
    const propertyService = Container.get(TYPES.PROPERTY_SERVICE)
    req.body.created_by = req.user.user_id

    const result = await propertyService.create(req.body)
    return success(res, result)
  } catch (err) {
    console.error(err)
    return next(err)
  }
}

const updateById = async (req, res, next) => {
  try {
    const propertyService = Container.get(TYPES.PROPERTY_SERVICE)

    const result = await propertyService.updateById(req.params.id, req.body)
    return success(res, result)
  } catch (err) {
    console.error(err)
    return next(err)
  }
}

const deteleById = async (req, res, next) => {
  try {
    const propertyService = Container.get(TYPES.PROPERTY_SERVICE)

    const result = await propertyService.deleteById(req.params.id)
    return success(res, result)
  } catch (err) {
    console.error(err)
    return next(err)
  }
}

export default {
  create,
  getById,
  updateById,
  deteleById,
  listByUserId
}
