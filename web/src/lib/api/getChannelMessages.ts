import { MessagesDto } from '@api-models';
import client from './base';

const getChannelMessages = async (
  code: string,
  page: number,
  pageSize: number,
): Promise<MessagesDto> => {
  const response = await client.get<MessagesDto>(
    `api/v1/channels/${code}/messages?page=${page}&pageSize=${pageSize}`,
  );

  return response.data;
};

getChannelMessages.cacheKey = (code: string) => ['channelMessages', code];
export default getChannelMessages;
