import * as R from 'ramda';
import { useEffect, useMemo } from 'react';
import { useQuery } from 'react-query';
import api from '@lib/api';
import {
  AuthWallActionType,
  AuthWallProgress,
  useAuthWallContext,
} from '@lib/contexts/authWallContext';
import { useRouter } from 'next/router';

const useLoginPage = () => {
  const context = useAuthWallContext();
  const { state, dispatch } = context;
  const router = useRouter();
  const { data, refetch } = useQuery(api.checkSession.cacheKey, api.checkSession, {
    retry: () =>
      state.progress === AuthWallProgress.BEGIN || state.progress === AuthWallProgress.AUTH,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    cacheTime: 0,
  });

  const isCurrent = useMemo(
    () => state.progress === AuthWallProgress.BEGIN || state.progress === AuthWallProgress.AUTH,
    [state.progress],
  );

  useEffect(() => {
    if (state.progress === AuthWallProgress.AUTH) {
      refetch();
    }
  }, [state, refetch]);

  useEffect(() => {
    if (state.progress === AuthWallProgress.BEGIN && !R.isNil(data) && !data.hasSession) {
      dispatch({
        type: AuthWallActionType.MOVE,
        progress: AuthWallProgress.USERNAME_SELECTION,
        payload: {},
      });
    }

    if (state.progress === AuthWallProgress.AUTH && !R.isNil(data) && data.hasSession) {
      router.push('/app');
    }
  }, [data, state, dispatch, router]);

  return { context, isCurrent };
};

export default useLoginPage;
