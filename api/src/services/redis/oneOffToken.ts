import { getRedisClient } from '../../redis'
import { OneOffLoginTokenDto } from '../../redis/types'
import R from 'ramda'

const setOneOffToken = async (dto: OneOffLoginTokenDto): Promise<void> => {
  const redis = getRedisClient()

  const key = getKey(dto.token)
  const data = JSON.stringify(dto)

  await redis.set(key, data, 'EX', 120)
}

const getOneOffToken = async (token: string): Promise<OneOffLoginTokenDto | null> => {
  const redis = getRedisClient()

  const key = getKey(token)
  const data = await redis.get(key)

  if (R.isNil(data)) {
    return null
  }

  await redis.del(key)
  return JSON.parse(data)
}

const getKey = (token: string): string => `login-token:${token}`

export default {
  setOneOffToken,
  getOneOffToken
}
