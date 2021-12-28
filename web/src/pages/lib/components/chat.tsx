import { ChannelDto, CurrentUserDto } from '@api-models';
import OneInputForm from '@lib/components/oneInputForm';
import ThemeSwitch from '@lib/components/themeSwitch';
import * as R from 'ramda';
import useChatMessaging from '../hooks/useChatMessaging';
import Messages from './messages';

type Props = {
  channel: ChannelDto;
  currentUser: CurrentUserDto;
};

const Chat: React.FC<Props> = ({ channel, currentUser }) => {
  const messaging = useChatMessaging(channel);

  return (
    <div className="h-screen flex flex-col content-between max-w-3xl m-auto justify-between px-5 pt-2 md:py-5 ">
      <div className="items-center flex flex-col gap-2 md:gap-4">
        <ThemeSwitch />
        <div className="centered-content-block">
          <div>
            <h1>
              Channel {R.isNil(channel.name) ? '' : `${channel.name} - `} {channel.code}
            </h1>
            <span className="description">Logged in as &apos;{currentUser.username}&apos;</span>
          </div>
        </div>
      </div>
      <Messages messaging={messaging} currentUser={currentUser} channel={channel} />
      <div className="mt-auto">
        <OneInputForm
          type="text"
          aria-label="channel-code"
          placeholder="Type a message"
          rightButtonContent="Send!"
          isLoading={false}
          handleSubmit={messaging.sendMessage}
        />
      </div>
    </div>
  );
};

export default Chat;
