import cors from 'cors'
import morgan from 'morgan'
import express from 'express'
import mquery from 'express-mquery'
import routes from 'src/controllers'
import lang from 'src/middlewares/lang'
import error from 'src/middlewares/error'
import notFound from 'src/middlewares/notFound'
import bodyParser from 'body-parser'

export default (port, ip) => {
  // define express app
  const app = express()

  // middlewares
  app.use(morgan('dev', { skip: () => process.env.NODE_ENV === 'test' }))
  app.use(cors({ methods: 'GET,PUT,POST,DELETE' }))
  app.use(mquery())
  app.use(lang)
  app.use(bodyParser.json())

  // app settings
  app.disable('etag')

  // set router
  app.use(routes)

  // Error Handler
  app.use(notFound)
  app.use(error)

  // run app
  app.listen(port, ip)

  // log
  console.log(`- Express running on http://${ip}:${port}`)

  return app
}
