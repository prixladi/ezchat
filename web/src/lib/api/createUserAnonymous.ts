import { AnonymousUserCreatedResponseDto } from '@api-models';
import client from './base';

const createUserAnonymous = async (): Promise<AnonymousUserCreatedResponseDto> => {
  const response = await client.post<AnonymousUserCreatedResponseDto>('api/v1/users/anonymous/');

  return response.data;
};

export default createUserAnonymous;
