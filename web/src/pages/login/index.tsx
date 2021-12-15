import type { NextPage } from 'next';
import Collapse from '../../components/Collapse';
import Username from '../../subpages/login/username';
import PasswordLogin from '../../subpages/login/passwordLogin';
import NewPassword from '../../subpages/login/newPassword';
import Email from '../../subpages/login/email';
import Head from 'next/head';
import { appName } from '../../constants';
import {
  AuthWallActionType,
  AuthWallProgress,
  useAuthWallContext,
} from '../../contexts/authWallContext';
import ThemeSwitch from '../../components/ThemeSwitch';
import api from '../../api';
import { useQuery } from 'react-query';
import { useEffect, useState } from 'react';
import * as R from 'ramda';
import { useRouter } from 'next/router';
import { useTimeoutFn } from 'react-use';

const Home: NextPage = () => {
  const { state, dispatch } = useAuthWallContext();
  const router = useRouter();
  const { data, refetch, error } = useQuery(api.checkSession.cacheKey, api.checkSession, {
    retry: () =>
      state.progress === AuthWallProgress.BEGIN || state.progress === AuthWallProgress.AUTH,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    cacheTime: 0,
  });

  console.log(JSON.stringify(error));
  console.log(typeof error);

  useEffect(() => {
    if (state.progress === AuthWallProgress.AUTH) {
      refetch();
    }
  }, [state, refetch]);

  useEffect(() => {
    if (state.progress === AuthWallProgress.BEGIN && !R.isNil(data) && !data.hasSession) {
      dispatch({
        type: AuthWallActionType.FILL,
        progress: AuthWallProgress.USERNAME_SELECTION,
        payload: {},
      });
    }

    if (state.progress === AuthWallProgress.AUTH && !R.isNil(data) && data.hasSession) {
      router.push('/app');
    }
  }, [data, state, dispatch]);

  return (
    <>
      <Head>
        <title>{appName}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <Collapse in={state.progress === AuthWallProgress.USERNAME_SELECTION}>
        <Username />
      </Collapse>

      <Collapse in={state.progress === AuthWallProgress.PASSWORD_SELECTION}>
        <PasswordLogin />
      </Collapse>

      <Collapse in={state.progress === AuthWallProgress.NEW_PASSWORD_SELECTION}>
        <NewPassword />
      </Collapse>

      <Collapse in={state.progress === AuthWallProgress.EMAIL_SELECTION}>
        <Email />
      </Collapse>

      <Collapse
        in={state.progress === AuthWallProgress.BEGIN || state.progress === AuthWallProgress.AUTH}
      >
        <Loading />
      </Collapse>
    </>
  );
};

const Loading = () => {
  const [showMessage, setShowMessage] = useState(false);
  useTimeoutFn(() => setShowMessage(true), 8000);

  return (
    <div className="centered-content-md">
      <ThemeSwitch />
      <div className="centered-content-block">
        <h1>{appName}</h1>
        <p
          className={
            showMessage
              ? 'transition-all ease-in duration-500 opacity-1'
              : 'transition-all ease-in duration-500 opacity-0'
          }
        >
          Data are loading, if this takes too long try refreshing page, sorry for the incovinience.
        </p>

        <div className="spinner-wrapper">
          <div className="spinner" />
        </div>
      </div>
    </div>
  );
};

export default Home;
