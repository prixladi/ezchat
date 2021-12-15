import { CurrentUserResponseDto } from '@api-models';
import client from './base';

const getCurrentUser = async (): Promise<CurrentUserResponseDto> => {
  const response = await client.get<CurrentUserResponseDto>('api/v1/users/current');

  return response.data;
};

getCurrentUser.cacheKey = 'currentUser';
export default getCurrentUser;
