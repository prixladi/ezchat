import client from './base';
import { TokenLoginRequestDto } from '@api-models';

export default async (dto: TokenLoginRequestDto): Promise<void> => {
  await client.post('api/v1/auth/login/token', dto);
};
