import Container from 'src/core/di'
import TYPES from 'src/constants/di'

const hasPropertyAccess = async (propertyId, userId) => {
  const propertyService = Container.get(TYPES.PROPERTY_SERVICE)
  const result = await propertyService.hasAccess(propertyId, userId)
  return result
}

export default {
  hasPropertyAccess
}
