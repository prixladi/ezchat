import {
  maxChannelCodeLength,
  maxUserNameLength,
  minChannelCodeLength,
  minUserNameLength,
  validChannelRegex,
  validUsernameRegex,
} from '@lib/constants';
import * as R from 'ramda';

const validateChannelCode = (code: string) =>
  !R.isNil(code) &&
  code.length >= minChannelCodeLength &&
  code.length <= maxChannelCodeLength &&
  validChannelRegex.test(code);

const validateUsername = (username: string) =>
  !R.isNil(username) &&
  username.length >= minUserNameLength &&
  username.length <= maxUserNameLength &&
  validUsernameRegex.test(username);

const getRandomChannelCode = () => {
  const randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < 8; i += 1) {
    result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
  }
  return result;
};

const tooltipCommonProps = {
  event: 'click mouseover mouseenter',
  eventOff: 'mouseleave',
  globalEventOff: 'click',
  isCapture: true,
  scrollHide: true,
  insecure: false,
  className: 'tooltip',
};

export { validateUsername, validateChannelCode, getRandomChannelCode, tooltipCommonProps };
