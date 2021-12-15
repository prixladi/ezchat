import OneInputForm from '@lib/components/OneInputForm';
import ThemeSwitch from '@lib/components/ThemeSwitch';
import { appName } from '@lib/constants';
import type { NextPage } from 'next';
import usePasswordLoginPage from '../hooks/usePasswordLoginPage';

const PasswordLogin: NextPage = () => {
  const {
    context: { state },
    login,
    usernameSelected,
    isLoading,
    isCurrent,
  } = usePasswordLoginPage();

  const footer = () => (
    <p>
      Or pick{' '}
      <button type="button" className="link" onClick={usernameSelected}>
        different username
      </button>
    </p>
  );

  return (
    <div className="centered-content-md">
      <ThemeSwitch />
      <div className="centered-content-block">
        <h1>{appName} | Password</h1>
        <p>
          Enter password for user <b>&apos;{state.payload?.username}&apos;</b>.
        </p>
      </div>
      <OneInputForm
        isOpen={isCurrent}
        type="password"
        autoComplete="current-password"
        placeholder="**************"
        aria-label="password"
        rightButtonContent="GO!"
        isLoading={isLoading}
        handleSubmit={login}
        additionalContent={
          <input
            value={state.payload?.username ?? 'default'}
            autoComplete="username"
            type="text"
            hidden
            readOnly
          />
        }
        footerContent={footer}
      />
    </div>
  );
};

export default PasswordLogin;
