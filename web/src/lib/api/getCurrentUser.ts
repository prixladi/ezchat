import { CurrentUserDto } from '@api-models';
import client from './base';

const getCurrentUser = async (): Promise<CurrentUserDto> => {
  const response = await client.get<CurrentUserDto>('api/v1/users/current');

  return response.data;
};

getCurrentUser.cacheKey = ['currentUser'];
export default getCurrentUser;
