import { useRouter } from 'next/router';
import { useMutation } from 'react-query';
import api from '@lib/api';
import { routes } from '@lib/constants';
import { AuthWallActionType, useAuthWallContext } from '@lib/contexts/authWallContext';

const useLogout = () => {
  const { dispatch } = useAuthWallContext();
  const router = useRouter();
  const { mutateAsync } = useMutation(api.logout);

  return async () => {
    try {
      await mutateAsync();
    } catch (err) {
      console.error(err);
    }

    dispatch({
      type: AuthWallActionType.CLEAR,
    });

    router.push(routes.login);
  };
};

export default useLogout;
