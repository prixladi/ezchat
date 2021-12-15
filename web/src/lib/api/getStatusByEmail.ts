import client from './base'
import { EmailStatusResponseDto } from '@api-models'

const getStatusByEmail = async (email: string): Promise<EmailStatusResponseDto> => {
  const response = await client.get<EmailStatusResponseDto>(`api/v1/users/by-email/${email}`)

  return response.data
}

getStatusByEmail.cacheKey = 'emailStatus'
export default getStatusByEmail