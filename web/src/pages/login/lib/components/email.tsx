import type { NextPage } from 'next';
import OneInputForm, { FormUtils } from '@lib/components/OneInputForm';
import ThemeSwitch from '@lib/components/ThemeSwitch';
import { appName } from '../../../../lib/constants';
import useEmailPage from '../hooks/useEmailPage';

const Email: NextPage = () => {
  const {
    context: { state },
    registerWithEmail,
    registerWithoutEmail,
    isLoading,
    isCurrent,
  } = useEmailPage();

  const footer = (utils: FormUtils) => (
    <p>
      Or{' '}
      <button type="button" className="link" onClick={() => registerWithoutEmail(utils)}>
        skip this step
      </button>
    </p>
  );

  return (
    <div className="centered-content-md">
      <ThemeSwitch />
      <div className="centered-content-block">
        <h1>{appName} | Email</h1>
        <p>
          Enter email for user <b>&apos;{state.payload?.username}&apos;</b> for possible password
          recovery. This step is optional.
        </p>
      </div>
      <OneInputForm
        isOpen={isCurrent}
        isLoading={isLoading}
        type="email"
        autoComplete="email"
        placeholder="user@email.com"
        aria-label="password"
        rightButtonContent="GO!"
        handleSubmit={registerWithEmail}
        footerContent={footer}
      />
    </div>
  );
};

export default Email;
