import { CreateUserRequestDto } from '@api-models'
import { User } from '../../entity/User'
import normalizeUsernameOrEmail from './normalizeUsernameOrEmail'
import R from 'ramda'
import password from '../auth/password'

export default (dto: CreateUserRequestDto): User => {
  const user = new User()
  user.isAnonymous = false

  user.username = dto.username
  user.normalizedUsername = normalizeUsernameOrEmail(dto.username)

  if (!R.isNil(dto.email)) {
    user.email = dto.email
    user.normalizedEmail = normalizeUsernameOrEmail(dto.email)
  }

  const { hash, salt } = password.createPasswordPair(dto.password)

  user.passwordHash = hash
  user.passwordSalt = salt

  return user
}
