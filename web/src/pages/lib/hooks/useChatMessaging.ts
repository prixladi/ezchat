import { ChannelDto, MessageRecievedData } from '@api-models';
import api from '@lib/api';
import { FormUtils } from '@lib/components/oneInputForm';
import useSocket from '@lib/hooks/useSocket';
import * as R from 'ramda';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';

type Return = {
  messages?: MessageRecievedData[];
  sendMessage: (value: string, { clearInput, setError }: FormUtils) => Promise<void>;
};

const useChatMessaging = (channel: ChannelDto): Return => {
  const { socket, connected } = useSocket();
  const { data: messages } = useQuery(
    api.getChannelMessages.cacheKey(channel.code),
    () => api.getChannelMessages(channel.code),
    {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      staleTime: Infinity, // 24hrs
      keepPreviousData:
    },
  );
  const [data, setData] = useState([] as MessageRecievedData[]);

  useEffect(() => {
    const messageRecieved = (x: MessageRecievedData) => {
      if (x.channelCode === channel.code) {
        setData((p) => [...p, x]);
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

  return {
    messages: R.isNil(messages) ? undefined : [...messages.data, ...data],
    sendMessage,
  };
};

export default useChatMessaging;
