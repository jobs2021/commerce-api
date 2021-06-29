import { port, ip } from 'src/config'
import startServer from 'src/core'

startServer({ app: { port, ip } })
