import { MessagesDto } from '@api-models';
import client from './base';

const getChannelMessages = async (code: string): Promise<MessagesDto> => {
  const response = await client.get<MessagesDto>(`api/v1/channels/${code}/messages`);

  return response.data;
};

getChannelMessages.cacheKey = (code: string) => ['channelMessages', code];
export default getChannelMessages;
