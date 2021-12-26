import api from '@lib/api';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';

const Channel: NextPage = () => {
  const { query } = useRouter();
  const code = query.code as string;

  const { data } = useQuery(api.checkChannel.cacheKey(code), () => api.checkChannel(code));

  if (!data) {
    return <div>{JSON.stringify(query)}</div>;
  }

  return <span>xxx</span>;
};

export default Channel;
