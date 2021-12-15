import client from './base'
import { CreateUserRequestDto, UserCreatedResponseDto } from '@api-models'

export default async (dto: CreateUserRequestDto): Promise<UserCreatedResponseDto> => {
  const response = await client.post<UserCreatedResponseDto>('api/v1/users/', dto)

  return response.data
}
