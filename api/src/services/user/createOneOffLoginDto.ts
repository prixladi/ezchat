import { randomBytes } from 'crypto';
import User from '../../entity/User';
import { OneOffLoginTokenDto } from '../../redis/types';

export default (user: User): OneOffLoginTokenDto => ({
  userId: user.id,
  token: randomBytes(32).toString('hex'),
});
