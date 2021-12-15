import { UsernameStatusResponseDto } from '@api-models';
import client from './base';

const getStatusByUsername = async (username: string): Promise<UsernameStatusResponseDto> => {
  const response = await client.get<UsernameStatusResponseDto>(
    `api/v1/users/by-username/${username}`,
  );

  return response.data;
};

getStatusByUsername.cacheKey = 'usernameStatus';
export default getStatusByUsername;
