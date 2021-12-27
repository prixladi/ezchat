import { ChannelDto, MessageRecievedData } from '@api-models';
import { encode } from '@lib/chatTextTransform';
import OneInputForm, { FormUtils } from '@lib/components/oneInputForm';
import ThemeSwitch from '@lib/components/themeSwitch';
import useSocket from '@lib/hooks/useSocket';
import * as R from 'ramda';
import { useState, useEffect } from 'react';

type Props = {
  channel: ChannelDto;
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
          className="rounded-full border-2 dark:text-black border-gray-900 bg-zinc-300 
          px-1 w-10 h-8 text-center p-1 text-lg font-extrabold pb-8 col-span-1 min-w-40"
        >
          A
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
  const { socket, connected } = useSocket();
  const [data, setData] = useState([]);

  useEffect(() => {
    if (!R.isNil(socket) && connected) {
      socket.emit('join', { channelCode: channel.code });

      socket.on('messageRecieved', (x) => {
        if (x.channelCode === channel.code) {
          setData((p) => [x, ...p]);
        }
      });
    }
  }, [socket, connected, channel.code]);

  const onSubmit = async (value: string, { clearInput, setError }: FormUtils): Promise<void> => {
    if (R.isNil(value) || value === '') {
      return;
    }

    if (!socket.connected) {
      setError('Unable to send message to the server because socket is not connected.');
      return;
    }

    socket.emit('sendMessage', { channelCode: channel.code, content: value });
    clearInput();
  };
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
        {mapChatMessages(data)}
      </div>
      <div className="mt-auto">
        <OneInputForm
          type="text"
          aria-label="channel-code"
          placeholder="Type a message"
          rightButtonContent="Send!"
          isLoading={false}
          handleSubmit={onSubmit}
        />
      </div>
    </div>
  );
};

export default Chat;
