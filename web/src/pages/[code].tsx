import OneInputForm from '@lib/components/oneInputForm';
import Spinner from '@lib/components/spinner';
import ThemeSwitch from '@lib/components/themeSwitch';
import type { NextPage } from 'next';
import * as R from 'ramda';
import Chat from './lib/components/chat';
import useChannel from './lib/hooks/useChannel';
import useUser from './lib/hooks/useUser';

const Channel: NextPage = () => {
  const channel = useChannel();
  const { user, trySetUsername } = useUser();

  if (R.isNil(channel) || R.isNil(user)) {
    return <Spinner />;
  }

  if (R.isNil(user.username)) {
    return (
      <div className="centered-content-md">
        <ThemeSwitch />
        <div className="centered-content-block">
          <div>
            <h1>Username</h1>
            <span className="description">Choose username</span>
          </div>
        </div>
        <OneInputForm
          type="text"
          aria-label="username"
          placeholder="Username"
          rightButtonContent="GO!"
          isLoading={false}
          handleSubmit={trySetUsername}
        />
      </div>
    );
  }

  return <Chat channel={channel} currentUser={user} />;
};

export default Channel;
