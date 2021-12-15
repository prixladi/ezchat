import { PasswordLoginRequestDto } from '@api-models';
import client from './base';

const passwordLogin = async (dto: PasswordLoginRequestDto): Promise<void> => {
  await client.post('api/v1/auth/login/password', dto);
};

export default passwordLogin;
