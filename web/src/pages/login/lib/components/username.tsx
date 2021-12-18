import type { NextPage } from 'next';
import OneInputForm, { FormUtils } from '@lib/components/oneInputForm';
import ThemeSwitch from '@lib/components/themeSwitch';
import { appName } from '../../../../lib/constants';
import useUsernamePage from '../hooks/useUsernamePage';

const Username: NextPage = () => {
  const { check, anonymousLogin, isLoading, isCurrent } = useUsernamePage();

  const footer = (utils: FormUtils) => (
    <p>
      Or start{' '}
      <button type="button" onClick={() => anonymousLogin(utils)} className="link">
        anonymous
      </button>
    </p>
  );
  return (
    <div className="centered-content-md">
      <ThemeSwitch />
      <div className="centered-content-block">
        <h1>{appName} | Username</h1>
        <p>Choose new username or use your already existing account.</p>
      </div>
      <OneInputForm
        isOpen={isCurrent}
        type="text"
        autoComplete="username"
        placeholder="Username"
        aria-label="username"
        rightButtonContent="GO!"
        isLoading={isLoading}
        handleSubmit={check}
        footerContent={footer}
      />
    </div>
  );
};

export default Username;
