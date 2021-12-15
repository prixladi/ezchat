import client from './base'
import { CurrentUserResponseDto } from '@api-models'

const action = async (): Promise<CurrentUserResponseDto> => {
  const response = await client.get<CurrentUserResponseDto>('api/v1/users/current')

  return response.data
}

action.cacheKey = 'currentUser'
export default action
