import type { NextPage } from 'next';
import OneInputForm from '../../components/OneInputForm';
import ThemeSwitch from '../../components/ThemeSwitch';
import { appName } from '../../constants';
import {
  AuthWallActionType,
  AuthWallProgress,
  useAuthWallContext,
} from '../../contexts/authWallContext';

const PasswordLogin: NextPage = () => {
  const { state, dispatch } = useAuthWallContext();

  const dispatchReadyToLogin = (password: string) => {
    dispatch({
      type: AuthWallActionType.FILL,
      progress: AuthWallProgress.READY_TO_LOGIN,
      payload: {
        password,
      },
    });
  };

  const dispatchUsernameSelection = () => {
    dispatch({
      type: AuthWallActionType.FILL,
      progress: AuthWallProgress.USERNAME_SELECTION,
      payload: {},
    });
  };

  return (
    <div className="centered-content-md">
      <ThemeSwitch />
      <div className="centered-content-block">
        <h1>{appName} | Password</h1>
        <p>Enter password for user <b>&apos;{state.username}&apos;</b>.</p>
      </div>
      <OneInputForm
        isOpen={state.progress === AuthWallProgress.PASSWORD_SELECTION}
        type="password"
        autoComplete="current-password"
        placeholder="**************"
        aria-label="password"
        rightButtonContent="GO!"
        handleSubmit={async (password: string) => dispatchReadyToLogin(password)}
        footerContent={
          <p>
            Or pick{' '}
            <a className="link" onClick={dispatchUsernameSelection}>
              different username
            </a>
          </p>
        }
      />
    </div>
  );
};

export default PasswordLogin;
