import { Container } from 'inversify'
import { APIError } from 'src/utils/errorHandler'
import TYPES from 'src/constants/di'
import MongoModels from 'src/models'
import MongoConnection from 'src/core/mongo'
import configs from 'src/config'
import jwt from 'jwt-simple'
import paginate from 'src/utils/paginate'
import bcrypt from 'bcrypt'
import moment from 'moment'
import Services from 'src/services'

// Declare DI Container
const container = new Container()

// Binding Dependencies
container.bind(TYPES.API_ERROR).toConstructor(APIError)
container.bind(TYPES.MONGO_MODELS).toConstantValue(MongoModels)
container.bind(TYPES.MONGO_CONNECTION).toConstantValue(MongoConnection)
container.bind(TYPES.CONFIGS).toConstantValue(configs)
container.bind(TYPES.JWT).toConstantValue(jwt)
container.bind(TYPES.PAGINATE).toConstantValue(paginate.paginate)
container.bind(TYPES.BCRYPT).toConstantValue(bcrypt)
container.bind(TYPES.MOMENT).toConstantValue(moment)

// Services
container.bind(TYPES.CRYPT_SERVICE).to(Services.CryptService)
container.bind(TYPES.JWT_SERVICE).to(Services.JWTService)
container.bind(TYPES.AUTH_SERVICE).to(Services.AuthService)
container.bind(TYPES.USER_SERVICE).to(Services.UserService)
container.bind(TYPES.PROPERTY_SERVICE).to(Services.PropertyService)


export default container