import type { NextPage } from 'next';
import { useState } from 'react';
import Collapse from '../../components/Collapse';
import Username from '../../subpages/login/username';
import PasswordLogin from '../../subpages/login/passwordLogin';
import NewPassword from '../../subpages/login/newPassword';
import Email from '../../subpages/login/email';
import Head from 'next/head';
import { appName } from '../../constants';
import { AuthWallProgress, useAuthWallContext } from '../../contexts/authWallContext';
import ThemeSwitch from '../../components/ThemeSwitch';

const Home: NextPage = () => {
  const { state } = useAuthWallContext();

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
        in={
          state.progress === AuthWallProgress.READY_TO_LOGIN ||
          state.progress === AuthWallProgress.READY_TO_REGISTER ||
          state.progress == AuthWallProgress.READY_TO_LOGIN_ANONYMOUS
        }
      >
        <div className="centered-content-md">
          <ThemeSwitch />
          <div className="centered-content-block">
            <h1>{appName} | Logging in</h1>
            <p>Logging into the application, a moment of patience please.</p>
            <div className="spinner-wrapper">
              <div className="spinner" />
            </div>
          </div>
        </div>
      </Collapse>
    </>
  );
};

export default Home;
