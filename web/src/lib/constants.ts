export const appName = 'EzChat';

export const validChannelRegex = /^(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/;

export const minChannelCodeLength = 3;
export const maxChannelCodeLength = 35;

export const validUsernameRegex = /^(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/;

export const minUserNameLength = 3;
export const maxUserNameLength = 20;

export const routes = {
  root: '/',
};
