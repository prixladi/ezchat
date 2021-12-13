import type { NextPage } from 'next';
import OneInputForm, { FormUtils } from '../../components/OneInputForm';
import ThemeSwitch from '../../components/ThemeSwitch';
import { useQueryClient } from 'react-query';
import api from '../../api';
import { appName, validUsernameRegex } from '../../constants';
import * as R from 'ramda';
import { useCallback } from 'react';

type Props = {
  isOpen: boolean;
  setState: (str: string) => void;
};

const Username: NextPage<Props> = ({ isOpen, setState }) => {
  const client = useQueryClient();

  const onSubmit = useCallback(
    async (newUsername: string, { setError }: FormUtils) => {
      if (R.isNil(newUsername) || R.isEmpty(newUsername) || R.length(newUsername) < 3) {
        setError('Username must be between 3 and 50 characters long.');
        return;
      }

      if (!validUsernameRegex.test(newUsername)) {
        setError('Username can only contain letters and numbers.');
        return;
      }

      try {
        const data = await client.fetchQuery(['usernameStatus', newUsername], () =>
          api.getStatusByUsername(newUsername!),
        );

        if (data.used) {
          setState('1');
        } else {
          setState('2');
        }
      } catch (err) {
        console.error(err);
        setError('Error occurend on server. Try again please.');
      }
    },
    [client],
  );

  return (
    <>
      <div className="centered-content-md">
        <ThemeSwitch />
        <div className="centered-content-block">
          <h1>{appName} | Username</h1>
          <p>Choose new username or use your already existing account.</p>
        </div>
        <OneInputForm
          isOpen={isOpen}
          type="text"
          autoComplete="username"
          placeholder="Username"
          aria-label="username"
          rightButtonContent="GO!"
          onSubmit={onSubmit}
          footerContent={
            <p>
              Or start <a className="link">anonymous</a>
            </p>
          }
        />
      </div>
    </>
  );
};

export default Username;
