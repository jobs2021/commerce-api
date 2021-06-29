import { mongo } from 'src/config/index'
import CreateConnection from './connection'

export default CreateConnection(mongo)