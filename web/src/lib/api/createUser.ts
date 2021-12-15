import client from './base'
import { CreateUserRequestDto, UserCreatedResponseDto } from '@api-models'

const createUser = async (dto: CreateUserRequestDto): Promise<UserCreatedResponseDto> => {
  const response = await client.post<UserCreatedResponseDto>('api/v1/users/', dto)

  return response.data
}

export default createUser
