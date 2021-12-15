import type { NextPage } from 'next';
import * as R from 'ramda';
import { useState } from 'react';
import { useQueryClient } from 'react-query';
import api from '../../api';
import OneInputForm, { FormUtils } from '../../components/OneInputForm';
import ThemeSwitch from '../../components/ThemeSwitch';
import { appName, validEmailRegex } from '../../constants';
import {
  AuthWallActionType,
  AuthWallProgress,
  useAuthWallContext,
} from '../../contexts/authWallContext';

const Email: NextPage = () => {
  const client = useQueryClient();
  const { state, dispatch } = useAuthWallContext();
  const [isLoading, setIsLoading] = useState(false);

  const register = async ({ setError, hideError }: FormUtils, email?: string) => {
    if (isLoading) {
      return;
    }

    hideError();
    setIsLoading(true);
    try {
      await client.executeMutation({
        mutationFn: async () =>
          await api.createUser({
            username: state.username!,
            password: state.password!,
            email: email,
          }),
      });

      dispatch({
        type: AuthWallActionType.AUTH,
      });
    } catch (err) {
      setError('Unable to create account with provided email because of the error on server.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = async (email: string, utils: FormUtils) => {
    if (R.isNil(email) || R.isEmpty(email) || !validEmailRegex.test(email)) {
      utils.setError('Value must be an valid email (eg. user@gmail.com).');
      return;
    }
    try {
      const data = await client.fetchQuery([api.getStatusByEmail.cacheKey, email], () =>
        api.getStatusByEmail(email!),
      );

      if (!data.valid) {
        utils.setError("Email didn't pass validation on server, try different one.");
        return;
      }

      if (data.used) {
        utils.setError('Email is already used, try different one.');
        return;
      }

      await register(utils, email);
    } catch (err) {
      console.error(err);
      utils.setError('Error occurend on server. Try again please.');
    }
  };

  return (
    <div className="centered-content-md">
      <ThemeSwitch />
      <div className="centered-content-block">
        <h1>{appName} | Email</h1>
        <p>
          Enter email for user <b>&apos;{state.username}&apos;</b> for possible password recovery.
          This step is optional.
        </p>
      </div>
      <OneInputForm
        isOpen={state.progress === AuthWallProgress.EMAIL_SELECTION}
        type="email"
        autoComplete="email"
        placeholder="user@email.com"
        aria-label="password"
        rightButtonContent="GO!"
        handleSubmit={onSubmit}
        footerContent={(utils) => (
          <p>
            Or{' '}
            <a className="link" onClick={() => register(utils)}>
              skip this step
            </a>
          </p>
        )}
      />
    </div>
  );
};

export default Email;
