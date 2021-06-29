import EventEmitter from 'events'
import userEvents from './user.events'

const eventEmiter = new EventEmitter()

userEvents(eventEmiter)

export default eventEmiter