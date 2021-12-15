export const appName = 'EzChat';

export const validUsernameRegex = /^(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/;

export const validEmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const minUserNameLength = 3;
export const maxUserNameLength = 20;

export const routes = {
  login: '/login',
  root: '/',
  app: '/app',
};
