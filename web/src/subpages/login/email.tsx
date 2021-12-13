import type { NextPage } from 'next';
import * as R from 'ramda';
import OneInputForm, { FormUtils } from '../../components/OneInputForm';
import ThemeSwitch from '../../components/ThemeSwitch';
import { appName } from '../../constants';
import {
  AuthWallActionType,
  AuthWallProgress,
  useAuthWallContext,
} from '../../contexts/authWallContext';

const Email: NextPage = () => {
  const { state, dispatch } = useAuthWallContext();

  const dispatchFill = (email?: string) => {
    dispatch({
      type: AuthWallActionType.FILL,
      progress: AuthWallProgress.READY_TO_REGISTER,
      payload: {
        email,
      },
    });
  };

  const onSubmit = async (email: string, { setError }: FormUtils) => {
    if (R.isNil(email) || R.isEmpty(email) || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Value must be an valid email (eg. user@gmail.com).');
      return;
    }

    dispatchFill(email);
  };

  return (
    <div className="centered-content-md">
      <ThemeSwitch />
      <div className="centered-content-block">
        <h1>{appName} | Email</h1>
        <p>
          Enter email for user <b>&apos;{state.username}&apos;</b> for possible password recovery.
          This step is optional.
        </p>
      </div>
      <OneInputForm
        isOpen={state.progress === AuthWallProgress.EMAIL_SELECTION}
        type="email"
        autoComplete="email"
        placeholder="user@email.com"
        aria-label="password"
        rightButtonContent="GO!"
        handleSubmit={onSubmit}
        footerContent={
          <p>
            Or{' '}
            <a className="link" onClick={() => dispatchFill()}>
              skip this step
            </a>
          </p>
        }
      />
    </div>
  );
};

export default Email;
