import type { NextPage } from 'next';
import OneInputForm, { FormUtils } from '../../components/OneInputForm';
import ThemeSwitch from '../../components/ThemeSwitch';
import { useQueryClient } from 'react-query';
import api from '../../api';
import { appName, maxUserNameLength, minUserNameLength, validUsernameRegex } from '../../constants';
import * as R from 'ramda';
import {
  AuthWallActionType,
  AuthWallProgress,
  useAuthWallContext,
} from '../../contexts/authWallContext';
import { useState } from 'react';

const Username: NextPage = () => {
  const client = useQueryClient();
  const { state, dispatch } = useAuthWallContext();
  const [isLoading, setIsLoading] = useState(false);

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

  const anonymousLogin = async ({ setError, hideError }: FormUtils) => {
    if (isLoading) {
      return;
    }

    hideError();
    setIsLoading(true);
    try {
      await client.executeMutation({
        mutationFn: async () => await api.createUserAnonymous(),
      });

      dispatch({
        type: AuthWallActionType.AUTH,
      });
    } catch (err) {
      setError('Unable to log anonymously because of the error on server.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = async (username: string, { setError }: FormUtils) => {
    if (
      R.isNil(username) ||
      R.isEmpty(username) ||
      R.length(username) < minUserNameLength ||
      R.length(username) > maxUserNameLength
    ) {
      setError(
        `Username must be between '${minUserNameLength}' and '${maxUserNameLength}' characters long.`,
      );
      return;
    }

    if (!validUsernameRegex.test(username)) {
      setError('Username can only contain letters and numbers.');
      return;
    }

    try {
      const data = await client.fetchQuery([api.getStatusByUsername.cacheKey, username], () =>
        api.getStatusByUsername(username!),
      );

      if (!data.valid) {
        setError("Username didn't pass validation on server, try different one.");
        return;
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
          isLoading={isLoading}
          handleSubmit={onSubmit}
          footerContent={(utils) => (
            <p>
              Or start{' '}
              <a onClick={() => anonymousLogin(utils)} className="link">
                anonymous
              </a>
            </p>
          )}
        />
      </div>
    </>
  );
};

export default Username;
