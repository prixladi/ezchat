import { ChannelDto } from '@api-models';
import client from './base';

const checkChannel = async (code: string): Promise<ChannelDto> => {
  const response = await client.post<ChannelDto>(`api/v1/channels/check/${code}`);

  return response.data;
};

checkChannel.cacheKey = (code: string) => ['channel', code];
export default checkChannel;
