import type { NextPage } from 'next';
import OneInputForm from '../../components/OneInputForm';
import ThemeSwitch from '../../components/ThemeSwitch';
import { appName } from '../../constants';

type Props = {
  isOpen: boolean;
  setState: (str: string) => void;
};

const NewPassword: NextPage<Props> = ({ isOpen, setState }) => (
  <div className="centered-content-md">
    <ThemeSwitch />
    <div className="centered-content-block">
      <h1>{appName} | New Password</h1>
      <p>Choose new password for user &apos;jack&apos;.</p>
    </div>
    <OneInputForm
      isOpen={isOpen}
      type="password"
      autoComplete="new-password"
      placeholder="**************"
      aria-label="new-password"
      rightButtonContent="GO!"
      onSubmit={async () => {
        setState('3');
      }}
      footerContent={
        <p>
          Or pick{' '}
          <a className="link" onClick={() => setState('0')}>
            different username
          </a>
        </p>
      }
    />
  </div>
);

export default NewPassword;
