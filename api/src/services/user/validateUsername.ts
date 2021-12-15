import { User } from '../../entity/User'
import R from 'ramda'

export default (username?: string | null): boolean => {
  return (
    !R.isNil(username) &&
    R.length(username) >= 3 &&
    R.length(username) <= 20 &&
    User.validUsernameRegex.test(username)
  )
}
