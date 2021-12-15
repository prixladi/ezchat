import { User } from '../../entity/User'
import R from 'ramda'

export default (email?: string | null): boolean => {
  return !R.isNil(email) && User.validEmailRegex.test(email)
}
