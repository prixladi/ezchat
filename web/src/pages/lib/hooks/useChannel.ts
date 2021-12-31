import api from '@lib/api';
import { AxiosError } from 'axios';
import { useRouter } from 'next/router';
import * as R from 'ramda';
import { useEffect } from 'react';
import { useQuery } from 'react-query';
import { validateChannelCode } from '../utils';

const useChannel = () => {
  const router = useRouter();
  const { query } = router;
  const code = query.code as string;

  const validCode = R.isNil(code) || validateChannelCode(code);

  const { data, error } = useQuery(api.checkChannel.cacheKey(code), () => api.checkChannel(code), {
    retry: 1,
    enabled: validCode,
  });

  useEffect(() => {
    const axiosError = error as AxiosError;
    if (!R.isNil(axiosError) && axiosError?.response.status === 400) {
      router.push('/');
    }
  }, [error, router]);

  if (!validCode) {
    router.push('/');
    return null;
  }

  return data;
};

export default useChannel;
