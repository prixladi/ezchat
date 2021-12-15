import { CreateUserRequestDto, UserCreatedResponseDto } from '@api-models';
import client from './base';

const createUser = async (dto: CreateUserRequestDto): Promise<UserCreatedResponseDto> => {
  const response = await client.post<UserCreatedResponseDto>('api/v1/users/', dto);

  return response.data;
};

export default createUser;
