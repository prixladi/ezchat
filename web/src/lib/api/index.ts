import checkSession from './checkSession';
import createChannel from './createChannel';
import createUser from './createUser';
import createUserAnonymous from './createUserAnonymous';
import getChannel from './getChannel';
import getCurrentChannels from './getCurrentChannels';
import getCurrentUser from './getCurrentUser';
import getStatusByEmail from './getStatusByEmail';
import getStatusByUsername from './getStatusByUsername';
import logout from './logout';
import passwordLogin from './passwordLogin';
import tokenLogin from './tokenLogin';

const api = {
  getStatusByUsername,
  getStatusByEmail,
  createUser,
  createUserAnonymous,
  getCurrentUser,
  passwordLogin,
  tokenLogin,
  logout,
  checkSession,

  createChannel,
  getCurrentChannels,
  getChannel,
};

export default api;
