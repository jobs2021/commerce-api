import { Schema } from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'

const modelName = 'properties'

const schema = new Schema({
  name: {
    type: String
  },
  long_description: {
    type: String
  },
  image: {
    type: String
  },
  extra_images: [{
    type: String, default: [], maxItems: 5
  }],
  currency: {
    type: String, enum: ['usd', 'eur', 'cad'], default: 'usd'
  },
  price: {
    type: Number, default: 0.00, 
  },
  amenities: [{
    name: {
      type: String
    },
    value: {
      type: String
    },
  }],
  location: {
    latitude: {
      type: String
    },
    longitude: {
      type: String
    },
  },
  created_by: {
    type: String, ref: 'users'
  },
  created_at: {
    type: Date, default: Date.now
  },
  status: {
    type: String, enum: ['active', 'deleted'], default: 'active'
  }
})

schema.plugin(mongoosePaginate)

export default (connection) => {
  return connection.model(modelName, schema)
}
