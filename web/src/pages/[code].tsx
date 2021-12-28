import api from '@lib/api';
import OneInputForm, { FormUtils } from '@lib/components/oneInputForm';
import ThemeSwitch from '@lib/components/themeSwitch';
import { maxUserNameLength, minUserNameLength, validUsernameRegex } from '@lib/constants';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import * as R from 'ramda';
import { useMutation, useQuery } from 'react-query';
import Chat from './lib/components/chat';

const Channel: NextPage = () => {
  const { query } = useRouter();
  const code = query.code as string;

  const { data: channel } = useQuery(api.checkChannel.cacheKey(code), () => api.checkChannel(code));
  const { data: user, refetch } = useQuery(api.getCurrentUser.cacheKey, () => api.getCurrentUser());
  const { mutateAsync: setUsername } = useMutation((username: string) => api.setUsername(username));

  const onSubmit = async (username: string, { setError }: FormUtils) => {
    if (
      R.isNil(username) ||
      username.length < minUserNameLength ||
      username.length > maxUserNameLength ||
      !validUsernameRegex.test(username)
    ) {
      setError(
        `Channel code must be a alphanumberic string between ${minUserNameLength} and ${maxUserNameLength} charactares long`,
      );

      return;
    }

    try {
      await setUsername(username);
      await refetch();
    } catch (err) {
      setError('Unable to set username because of error on server, try again later.');
      console.error(err);
    }
  };

  if (R.isNil(channel) || R.isNil(user)) {
    return <div>{JSON.stringify(query)}</div>;
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
          handleSubmit={onSubmit}
        />
      </div>
    );
  }

  return <Chat channel={channel} currentUser={user} />;
};

export default Channel;
