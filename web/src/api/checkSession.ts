import client from './base';
import { CheckSessionResponseDto } from '@api-models';

const action = async (): Promise<CheckSessionResponseDto> => {
  const response = await client.get<CheckSessionResponseDto>('api/v1/auth/check-session');

  return response.data;
};

action.cacheKey = 'checkSession';
export default action;
