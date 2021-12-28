import { ChannelDto, MessageRecievedData } from '@api-models';
import { encode } from '@lib/chatTextTransform';
import OneInputForm from '@lib/components/oneInputForm';
import ThemeSwitch from '@lib/components/themeSwitch';
import * as R from 'ramda';
import clsx from 'clsx';
import useChatMessaging from '../hooks/useChatMessaging';

type Props = {
  channel: ChannelDto;
};

const getAvatarColor = (id: string) => {
  const hash = R.reduce((acc, cur) => acc + cur.charCodeAt(0), 0, id.split(''));

  const colors = [
    'bg-white',
    'bg-gray-200',
    'bg-gray-300',
    'bg-gray-400',
    'bg-zinc-200',
    'bg-zinc-300',
    'bg-zinc-400',
    'bg-red-100',
    'bg-red-200',
    'bg-red-300',
    'bg-red-400',
  ];
  return colors[hash % colors.length];
};

const mapChatMessages = (data: MessageRecievedData[]): JSX.Element[] => {
  const grouped = R.groupWith(
    (a, b) =>
      a.user.id === b.user.id &&
      Math.abs(new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()) < 1000 * 60 * 20,
    data,
  );

  return R.map(
    (x) => (
      <div
        key={x[0].id}
        className="font-bold leading-loose break-all text-md hover:bg-opacity-30 flex gap-2"
      >
        <div
          className={clsx(
            'rounded-full border-2 dark:text-black border-gray-900 px-1 w-10 h-8 text-center p-1 text-lg font-extrabold pb-8 col-span-1 min-w-40',
            getAvatarColor(x[0].user.id),
          )}
        >
          {R.isNil(x[0].user.username) || x[0].user.username.length === 0
            ? 'A'
            : x[0].user.username[0].toUpperCase()}
        </div>
        <span className="chat-bubble">
          <span className="flex flex-col">
            {R.map(
              (a) => (
                <span key={a.id}>{encode(a.content)}</span>
              ),
              x.reverse(),
            )}
          </span>
        </span>
      </div>
    ),
    grouped,
  );
};

const Chat: React.FC<Props> = ({ channel }) => {
  const { messages, sendMessage } = useChatMessaging(channel);

  return (
    <div className="h-screen flex flex-col content-between max-w-2xl m-auto justify-between px-5 pt-2 md:py-5 ">
      <div className="items-center flex flex-col gap-2 md:gap-4">
        <ThemeSwitch />
        <div className="centered-content-block">
          <div>
            <h1>
              Channel {R.isNil(channel.name) ? '' : `${channel.name} - `} {channel.code}
            </h1>
            <span className="description">No description</span>
          </div>
        </div>
      </div>
      <div className="overflow-auto rounded-xl h-full flex flex-col-reverse gap-2 mt-4">
        {mapChatMessages(messages)}
      </div>
      <div className="mt-auto">
        <OneInputForm
          type="text"
          aria-label="channel-code"
          placeholder="Type a message"
          rightButtonContent="Send!"
          isLoading={false}
          handleSubmit={sendMessage}
        />
      </div>
    </div>
  );
};

export default Chat;
