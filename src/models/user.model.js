import { Schema } from 'mongoose'

const modelName = 'users'

const schema = new Schema({
  first_name: {
    type: String
  },
  last_name: {
    type: String
  },
  email: {
    type: String, unique: true
  },
  password: {
    type: String
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
