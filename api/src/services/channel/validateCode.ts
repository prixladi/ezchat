import R from 'ramda';
import Channel from '../../entity/Channel';

export default (code?: string): boolean => R.isNil(code) || Channel.validCodeRegex.test(code);
