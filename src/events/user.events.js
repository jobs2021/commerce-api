import Container from 'src/core/di'
import TYPES from 'src/constants/di'
import EVENTS from 'src/constants/events'

const userEvents = (eventEmiter) => {
    eventEmiter.on(EVENTS.USER_SIGNUP, async (user = {}) => {
        try {
            console.log('ENTRO', user)
            const emailService = Container.get(TYPES.EMAIL_SERVICE)
    
            const payload = {
                template: 'USER_SIGNUP',
                to: user.email,
                body: {
                    first_name: user.first_name
                }
            }
            const result = await emailService.send(payload)
            console.log(result)
        } catch (err) {
            console.error(err)
        }
    })
    
}

export default userEvents
