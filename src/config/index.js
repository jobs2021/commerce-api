import 'dotenv/config'

module.exports = {
  // Express
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 3001,
  ip: process.env.IP || '0.0.0.0',

  // JWT
  jwt: {
    secretKey: process.env.APP_JWT_SECRET_KEY,
    iss: process.env.APP_JWT_ISS, // passport.domain.com
    aud: process.env.APP_JWT_AUD, // domain.com
  },

  xAccessToken: process.env.APP_X_ACCESS_TOKEN,

  // email service
  emailEnpoint: process.env.APP_EMAIL_SERVICE_URL,

  // Languages (ISO)
  languages: {
    list: ['en', 'es'],
    default: 'es'
  },

  // DB
  mongo: {
    uri: process.env.APP_MONGO_URI,
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    }
  }

}
