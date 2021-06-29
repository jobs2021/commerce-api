import { Schema } from 'mongoose'

const modelName = 'users'

const schema = new Schema({
  first_name: {
    type: String, default: ''
  },
  last_name: {
    type: String, default: ''
  },
  email: {
    type: String, default: ''
  },
  password: {
    type: String, default: ''
  },
  created_at: {
    type: Date, default: Date.now
  },
  status: {
    type: String, enum: ['active', 'banned', 'deleted'], default: 'active'
  }
})

export default (connection) => {
  return connection.model(modelName, schema)
}
