import { ChannelDto, MessageRecievedData } from '@api-models';
import { FormUtils } from '@lib/components/oneInputForm';
import useSocket from '@lib/hooks/useSocket';
import * as R from 'ramda';
import { useEffect, useState } from 'react';

const useChatMessaging = (channel: ChannelDto) => {
  const { socket, connected } = useSocket();
  const [data, setData] = useState([]);

  useEffect(() => {
    const messageRecieved = (x: MessageRecievedData) => {
      if (x.channelCode === channel.code) {
        setData((p) => [x, ...p]);
      }
    };

    if (!R.isNil(socket) && connected) {
      socket.on('messageRecieved', messageRecieved);
      socket.emit('join', { channelCode: channel.code });

      return () => {
        socket.off('messageRecieved', messageRecieved);
      };
    }

    return undefined;
  }, [socket, connected, channel.code]);

  const sendMessage = async (value: string, { clearInput, setError }: FormUtils): Promise<void> => {
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

  return { messages: data, sendMessage };
};

export default useChatMessaging;
