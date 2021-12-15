import { createHash, randomBytes } from 'crypto'

type PasswordPair = {
  hash: string
  salt: string
}

const createPasswordPair = (password: string): PasswordPair => {
  const salt = randomBytes(16).toString('hex')
  const sha = createHash('sha256')
  sha.update(password + salt)

  return {
    salt,
    hash: sha.digest('hex')
  }
}

const comparePasswords = (password: string, { salt, hash }: PasswordPair): boolean => {
  const sha = createHash('sha256')
  sha.update(password + salt)

  return hash === sha.digest('hex')
}

export default {
  createPasswordPair,
  comparePasswords
}
