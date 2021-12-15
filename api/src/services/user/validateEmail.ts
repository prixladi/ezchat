import R from 'ramda';
import User from '../../entity/User';

export default (email?: string | null): boolean =>
  !R.isNil(email) && User.validEmailRegex.test(email);
