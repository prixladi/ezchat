import { randomUUID } from 'crypto';
import { User } from '../../entity/User';
import normalizeUsernameOrEmail from './normalizeUsernameOrEmail';

export default (): User => {
  const user = new User();
  user.isAnonymous = true;
  user.username = randomUUID();
  user.normalizedUsername = normalizeUsernameOrEmail(user.username);

  return user;
};
