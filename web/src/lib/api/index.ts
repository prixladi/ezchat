import checkSession from './checkSession';
import createUser from './createUser';
import createUserAnonymous from './createUserAnonymous';
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
};

export default api;
