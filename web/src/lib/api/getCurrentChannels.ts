import { ChannelPreviewDto } from '@api-models';
import client from './base';

const getCurrentChannels = async (): Promise<ChannelPreviewDto[]> => {
  const response = await client.get<ChannelPreviewDto[]>('api/v1/channels/current');

  return response.data;
};

getCurrentChannels.cacheKey = 'currentChannels';
export default getCurrentChannels;
