import * as R from 'ramda';
import { useMemo, useState } from 'react';
import { useQueryClient } from 'react-query';
import api from '@lib/api';
import { FormUtils } from '@lib/components/OneInputForm';
import { validEmailRegex } from '@lib/constants';
import {
  AuthWallActionType,
  AuthWallProgress,
  useAuthWallContext,
} from '@lib/contexts/authWallContext';

const useEmailPage = () => {
  const client = useQueryClient();
  const context = useAuthWallContext();
  const [isLoading, setIsLoading] = useState(false);
  const isCurrent = useMemo(
    () => context.state.progress === AuthWallProgress.EMAIL_SELECTION,
    [context.state.progress],
  );

  const register = async ({ setError, hideError }: FormUtils, email?: string) => {
    if (isLoading) {
      return;
    }

    hideError();
    setIsLoading(true);
    try {
      await client.executeMutation({
        mutationFn: () =>
          api.createUser({
            username: context.state.payload?.username!,
            password: context.state.payload?.password!,
            email,
          }),
      });

      context.dispatch({
        type: AuthWallActionType.AUTH,
      });
    } catch (err) {
      setError('Unable to create account with provided email because of the error on server.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const registerWithEmail = async (email: string, utils: FormUtils) => {
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

  const registerWithoutEmail = async (utils: FormUtils) => {
    await register(utils);
  };

  return { context, registerWithoutEmail, registerWithEmail, isLoading, isCurrent };
};

export default useEmailPage;
