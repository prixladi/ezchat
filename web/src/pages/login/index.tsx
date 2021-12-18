import type { NextPage } from 'next';
import Collapse from '@lib/components/Collapse';
import Head from 'next/head';
import { appName } from '@lib//constants';
import { AuthWallProgress } from '@lib/contexts/authWallContext';
import ThemeSwitch from '@lib/components/themeSwitch';
import { useState } from 'react';
import { useTimeoutFn } from 'react-use';
import Username from './lib/components/username';
import PasswordLogin from './lib/components/passwordLogin';
import NewPassword from './lib/components/newPassword';
import Email from './lib/components/email';
import useLoginPage from './lib/hooks/useLoginPage';

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

const Login: NextPage = () => {
  const {
    context: { state },
    isCurrent,
  } = useLoginPage();

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

      <Collapse in={isCurrent}>
        <Loading />
      </Collapse>
    </>
  );
};

export default Login;
