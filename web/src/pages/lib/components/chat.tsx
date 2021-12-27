import { ChannelDto } from '@api-models';
import OneInputForm from '@lib/components/oneInputForm';
import ThemeSwitch from '@lib/components/themeSwitch';
import { appName } from '@lib/constants';
import useSocket from '@lib/hooks/useSocket';
import * as R from 'ramda';
import { useEffect } from 'react';

type Props = {
  channel: ChannelDto;
};

const Chat: React.FC<Props> = ({ channel }) => {
  const { socket } = useSocket();

  useEffect(() => {
    if (!R.isNil(socket)) {
      socket.emit('join', { channelCode: channel.code });
    }
  }, [socket]);

  return (
    <div>
      <ThemeSwitch />
      <div className="centered-content-block">
        <div>
          <h1>
            Channel {R.isNil(channel.name) ? '' : `${channel.name} - `} {channel.code}
          </h1>
          <span className="opacity-50 font-bold">No description</span>
        </div>
        <OneInputForm
          type="text"
          aria-label="channel-code"
          placeholder="channel"
          rightButtonContent="Send!"
          isLoading={false}
          handleSubmit={async (x) => {
            socket.emit('sendMessage', { channelCode: channel.code, content: x });
          }}
        />
      </div>
    </div>
  );
};

export default Chat;
