import { CheckSessionResponseDto } from '@api-models';
import client from './base';

const checkSession = async (): Promise<CheckSessionResponseDto> => {
  const response = await client.get<CheckSessionResponseDto>('api/v1/auth/check-session');

  return response.data;
};

checkSession.cacheKey = 'checkSession';
export default checkSession;
