import { ChannelDto, MessageRecievedData } from '@api-models';
import api from '@lib/api';
import { FormUtils } from '@lib/components/oneInputForm';
import useSocket from '@lib/hooks/useSocket';
import * as R from 'ramda';
import { useEffect, useState } from 'react';
import { useInfiniteQuery } from 'react-query';

export type ChatMessaging = {
  messages?: MessageRecievedData[];
  sendMessage: (value: string, { clearInput, setError }: FormUtils) => Promise<void>;
  fetchNextPage: () => Promise<any>;
  hasNextPage: boolean;
  isFetching: boolean;
};

const useChatMessaging = (channel: ChannelDto): ChatMessaging => {
  const { socket, connected } = useSocket();
  const {
    data: messages,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  } = useInfiniteQuery(
    api.getChannelMessages.cacheKey(channel.code),
    ({ pageParam = 0 }) => api.getChannelMessages(channel.code, pageParam, 35),
    {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      staleTime: Infinity, // 24hrs
      getNextPageParam: (lastPage) =>
        lastPage.total > lastPage.pageSize * lastPage.page + lastPage.data.length
          ? R.inc(lastPage.page)
          : undefined,
    },
  );
  const [data, setData] = useState([] as MessageRecievedData[]);

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

  return {
    messages: R.isNil(messages)
      ? undefined
      : [...data, ...R.flatten(messages.pages.map((x) => x.data))],
    sendMessage,
    fetchNextPage,
    hasNextPage,
    isFetching: isFetching || isFetchingNextPage,
  };
};

export default useChatMessaging;
