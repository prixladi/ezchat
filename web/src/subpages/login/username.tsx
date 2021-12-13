import type { NextPage } from 'next';
import OneInputForm, { FormUtils } from '../../components/OneInputForm';
import ThemeSwitch from '../../components/ThemeSwitch';
import { useQueryClient } from 'react-query';
import api from '../../api';
import { appName, validUsernameRegex } from '../../constants';
import * as R from 'ramda';
import {
  AuthWallActionType,
  AuthWallProgress,
  useAuthWallContext,
} from '../../contexts/authWallContext';

const Username: NextPage = () => {
  const client = useQueryClient();
  const { state, dispatch } = useAuthWallContext();

  const dispatchPasswordSelection = (username: string) => {
    dispatch({
      type: AuthWallActionType.FILL,
      progress: AuthWallProgress.PASSWORD_SELECTION,
      payload: {
        username,
      },
    });
  };

  const dispatchNewPasswordSelection = (username: string) => {
    dispatch({
      type: AuthWallActionType.FILL,
      progress: AuthWallProgress.NEW_PASSWORD_SELECTION,
      payload: {
        username,
      },
    });
  };

  const dispatchAnonymousLogin = () => {
    dispatch({
      type: AuthWallActionType.FILL,
      progress: AuthWallProgress.READY_TO_LOGIN_ANONYMOUS,
      payload: {},
    });
  };

  const onSubmit = async (username: string, { setError }: FormUtils) => {
    if (
      R.isNil(username) ||
      R.isEmpty(username) ||
      R.length(username) < 3 ||
      R.length(username) > 20
    ) {
      setError('Username must be between 3 and 20 characters long.');
      return;
    }

    if (!validUsernameRegex.test(username)) {
      setError('Username can only contain letters and numbers.');
      return;
    }

    try {
      const data = await client.fetchQuery(['usernameStatus', username], () =>
        api.getStatusByUsername(username!),
      );

      if (!data.valid) {
        setError("Username didn't pass validation on server, try different one.");
      }

      if (data.used) {
        dispatchPasswordSelection(username);
      } else {
        dispatchNewPasswordSelection(username);
      }
    } catch (err) {
      console.error(err);
      setError('Error occurend on server. Try again please.');
    }
  };

  return (
    <>
      <div className="centered-content-md">
        <ThemeSwitch />
        <div className="centered-content-block">
          <h1>{appName} | Username</h1>
          <p>Choose new username or use your already existing account.</p>
        </div>
        <OneInputForm
          isOpen={state.progress === AuthWallProgress.USERNAME_SELECTION}
          type="text"
          autoComplete="username"
          placeholder="Username"
          aria-label="username"
          rightButtonContent="GO!"
          handleSubmit={onSubmit}
          footerContent={
            <p>
              Or start{' '}
              <a onClick={dispatchAnonymousLogin} className="link">
                anonymous
              </a>
            </p>
          }
        />
      </div>
    </>
  );
};

export default Username;
