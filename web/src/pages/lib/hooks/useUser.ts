import api from '@lib/api';
import { FormUtils } from '@lib/components/oneInputForm';
import { maxUserNameLength, minUserNameLength } from '@lib/constants';
import { useMutation, useQuery } from 'react-query';
import { validateUsername } from '../utils';

const useUser = () => {
  const { data: user, refetch } = useQuery(api.getCurrentUser.cacheKey, () => api.getCurrentUser());
  const { mutateAsync: setUsername } = useMutation((username: string) => api.setUsername(username));

  const trySetUsername = async (username: string, { setError }: FormUtils) => {
    if (!validateUsername(username)) {
      setError(
        `Username must be a alphanumberic string between ${minUserNameLength} and ${maxUserNameLength} charactares long`,
      );

      return;
    }

    try {
      await setUsername(username);
      await refetch();
    } catch (err) {
      setError('Unable to set username because of error on server, try again later.');
      console.error(err);
    }
  };

  return { user, trySetUsername };
};

export default useUser;
