import mongoose from 'mongoose'

export default (config) => {
  Object.keys(config.options).forEach((key) => mongoose.set(key, config.options[key]))

  mongoose.connection.on('error', (err) => {
    console.error(`MongoDB connection error: ${err}`)
    process.exit(1)
  })
 
  const connection = mongoose.createConnection(config.uri)
  return connection
}
