import client from './base'
import { EmailStatusResponseDto } from '@api-models'

const action = async (email: string): Promise<EmailStatusResponseDto> => {
  const response = await client.get<EmailStatusResponseDto>(`api/v1/users/by-email/${email}`)

  return response.data
}

action.cacheKey = 'emailStatus'
export default action
