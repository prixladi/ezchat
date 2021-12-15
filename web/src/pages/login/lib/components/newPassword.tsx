import type { NextPage } from 'next';
import { appName } from '@lib/constants';
import OneInputForm from '@lib/components/OneInputForm';
import ThemeSwitch from '@lib/components/ThemeSwitch';
import useNewPasswordPage from '../hooks/useNewPasswordPage';

const NewPassword: NextPage = () => {
  const {
    context: { state },
    passwordSelected,
    goToUsername,
    isCurrent,
  } = useNewPasswordPage();

  const footer = () => (
    <p>
      Or pick{' '}
      <button type="button" className="link" onClick={goToUsername}>
        different username
      </button>
    </p>
  );
  return (
    <div className="centered-content-md">
      <ThemeSwitch />
      <div className="centered-content-block">
        <h1>{appName} | New Password</h1>
        <p>
          Choose new password for user <b>&apos;{state.payload?.username}&apos;</b>.
        </p>
      </div>
      <OneInputForm
        isOpen={isCurrent}
        type="password"
        autoComplete="new-password"
        placeholder="**************"
        aria-label="new-password"
        rightButtonContent="GO!"
        handleSubmit={passwordSelected}
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

export default NewPassword;
