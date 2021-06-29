import JWT from 'jwt-simple'
import { jwt } from 'src/config'

const decodeToken = (token) => {
  try {
    // get payload from token
    return JWT.decode(token, jwt.secretKey, true)
  } catch (err) {
    return false
  }
}

export default { decodeToken }
