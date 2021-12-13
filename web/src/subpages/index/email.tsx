import type { NextPage } from 'next';
import OneInputForm from '../../components/OneInputForm';
import ThemeSwitch from '../../components/ThemeSwitch';
import { appName } from '../../constants';

type Props = {
  isOpen: boolean;
  setState: (str: string) => void;
};

const Email: NextPage<Props> = ({ isOpen, setState }) => (
  <div className="centered-content-md">
    <ThemeSwitch />
    <div className="centered-content-block">
      <h1>{appName} | Email</h1>
      <p>Enter email for possible password recovery. This step is optional.</p>
    </div>
    <OneInputForm
      isOpen={isOpen}
      type="email"
      autoComplete="email"
      placeholder="user@email.com"
      aria-label="password"
      rightButtonContent="GO!"
      onSubmit={async () => {
        setState('0');
      }}
      footerContent={
        <p>
          Or{' '}
          <a className="link" onClick={() => setState('0')}>
            skip this step
          </a>
        </p>
      }
    />
  </div>
);

export default Email;
