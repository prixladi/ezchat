import * as R from 'ramda';
import { useMemo, useState } from 'react';
import { useQueryClient } from 'react-query';
import api from '@lib/api';
import { FormUtils } from '@lib/components/oneInputForm';
import { maxUserNameLength, minUserNameLength, validUsernameRegex } from '@lib/constants';
import {
  AuthWallActionType,
  AuthWallProgress,
  useAuthWallContext,
} from '@lib/contexts/authWallContext';

const useUsernamePage = () => {
  const client = useQueryClient();
  const context = useAuthWallContext();
  const [isLoading, setIsLoading] = useState(false);
  const isCurrent = useMemo(
    () => context.state.progress === AuthWallProgress.USERNAME_SELECTION,
    [context.state.progress],
  );

  const dispatchPasswordSelection = (username: string) => {
    context.dispatch({
      type: AuthWallActionType.MOVE,
      progress: AuthWallProgress.PASSWORD_SELECTION,
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
        mutationFn: () => api.createUserAnonymous(),
      });

      context.dispatch({
        type: AuthWallActionType.AUTH,
      });
    } catch (err) {
      setError('Unable to log anonymously because of the error on server.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const dispatchNewPasswordSelection = (username: string) => {
    context.dispatch({
      type: AuthWallActionType.MOVE,
      progress: AuthWallProgress.NEW_PASSWORD_SELECTION,
      payload: {
        username,
      },
    });
  };

  const check = async (username: string, { setError }: FormUtils) => {
    if (isLoading) {
      return;
    }

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

  return { context, check, anonymousLogin, isLoading, isCurrent };
};

export default useUsernamePage;
