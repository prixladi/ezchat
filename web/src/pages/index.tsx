import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { routes } from '../lib/constants';

const Home: NextPage = () => {
  const router = useRouter();

  useEffect(() => {
    router.push(routes.login);
  }, [router]);

  return null;
};

export default Home;
