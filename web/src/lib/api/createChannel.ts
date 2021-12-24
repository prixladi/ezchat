import { ChannelCreatedResponseDto, CreateChannelRequestDto } from '@api-models';
import client from './base';

const createChannel = async (dto: CreateChannelRequestDto): Promise<ChannelCreatedResponseDto> => {
  const response = await client.post<ChannelCreatedResponseDto>('api/v1/channels/', dto);

  return response.data;
};

export default createChannel;
