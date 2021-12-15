import client from './base'
import { UsernameStatusResponseDto } from '@api-models'

const action = async (username: string): Promise<UsernameStatusResponseDto> => {
  const response = await client.get<UsernameStatusResponseDto>(
    `api/v1/users/by-username/${username}`
  )

  return response.data
}

action.cacheKey = 'usernameStatus'
export default action
