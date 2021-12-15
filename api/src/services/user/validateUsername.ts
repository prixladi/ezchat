import R from 'ramda';
import User from '../../entity/User';

export default (username?: string | null): boolean =>
  !R.isNil(username) &&
  R.length(username) >= 3 &&
  R.length(username) <= 20 &&
  User.validUsernameRegex.test(username);
