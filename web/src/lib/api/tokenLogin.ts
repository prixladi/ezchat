import { TokenLoginRequestDto } from '@api-models';
import client from './base';

const tokenLogin = async (dto: TokenLoginRequestDto): Promise<void> => {
  await client.post('api/v1/auth/login/token', dto);
};

export default tokenLogin;
