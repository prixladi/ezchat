import OneInputForm from '@lib/components/oneInputForm';
import ThemeSwitch from '@lib/components/themeSwitch';
import type { NextPage } from 'next';
import { appName } from '../lib/constants';
import useChannelPick from './lib/hooks/useChannelPick';

const Home: NextPage = () => {
  const { prefix, trySetChannel } = useChannelPick();

  return (
    <div className="centered-content-md">
      <ThemeSwitch />
      <div className="centered-content-block">
        <div>
          <h1>{appName}</h1>
          <span className="description">Simple chat, almost simplistic</span>
        </div>
        <p>
          Create new channel or join existing. You can also leave channel empty to generate random
          channel.
        </p>
      </div>
      <OneInputForm
        type="text"
        prefix={prefix}
        aria-label="channel-code"
        placeholder="channel"
        rightButtonContent="GO!"
        isLoading={false}
        handleSubmit={trySetChannel}
      />
    </div>
  );
};

export default Home;
