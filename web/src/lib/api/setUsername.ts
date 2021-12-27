import { ChannelDto } from '@api-models';
import client from './base';

const setUsername = async (username: string): Promise<ChannelDto> => {
  const response = await client.put<ChannelDto>('api/v1/users/current/username', { username });

  return response.data;
};

export default setUsername;
