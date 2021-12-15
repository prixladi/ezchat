import client from './base'
import { AnonymousUserCreatedResponseDto } from '@api-models'

export default async (): Promise<AnonymousUserCreatedResponseDto> => {
  const response = await client.post<AnonymousUserCreatedResponseDto>('api/v1/users/anonymous/')

  return response.data
}
