import User from '../../entity/User';
import normalizeUsernameOrEmail from './normalizeUsernameOrEmail';

export default (): User => {
  const user = new User();
  user.isAnonymous = true;
  user.username = `Anonymous${Math.floor(Math.random() * 99999999)}`;
  user.normalizedUsername = normalizeUsernameOrEmail(user.username);

  return user;
};
