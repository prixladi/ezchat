import { ChannelDeatailDto } from '@api-models';
import client from './base';

const getChannel = async (id: string): Promise<ChannelDeatailDto> => {
  const response = await client.get<ChannelDeatailDto>(`api/v1/channels/${id}`);

  return response.data;
};

getChannel.cacheKey = (id: string) => ['channel', id];
export default getChannel;
