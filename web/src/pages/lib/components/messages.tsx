import { ChannelDto, CurrentUserDto } from '@api-models';
import * as R from 'ramda';
import InfiniteScroll from '@lib/components/infiniteScroll';
import { ChatMessaging } from '../hooks/useChatMessaging';
import MessageGroup from './messageGroup';
import BeginningMessage from './beginningMessage';

const Loading = () => <div className="text-center font-extrabold text-xl">Loading...</div>;

type Props = {
  messaging: ChatMessaging;
  currentUser: CurrentUserDto;
  channel: ChannelDto;
};

const Messages: React.FC<Props> = ({ messaging, currentUser, channel }) => {
  const { messages, hasNextPage, fetchNextPage, isFetching } = messaging;
  if (R.isNil(messages)) {
    return (
      <div className="pt-4">
        <Loading />
      </div>
    );
  }

  const grouped = R.groupWith(
    (a, b) =>
      a.user.id === b.user.id &&
      Math.abs(new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()) < 1000 * 60 * 20,
    messages,
  );

  return (
    <InfiniteScroll
      dataLength={messages.length}
      inverse
      next={async () => fetchNextPage()}
      hasMore={hasNextPage}
      loader={<Loading />}
      height="100%"
      className="overflow-auto rounded-xl h-full flex flex-col-reverse gap-6 mt-4 px-2"
    >
      {messages.length === 0 && isFetching ? (
        <Loading />
      ) : (
        <>
          {R.map(
            (messageGroup) => (
              <MessageGroup
                key={`gr-${messageGroup[0].id}`}
                messageGroup={messageGroup}
                currentUser={currentUser}
              />
            ),
            grouped,
          )}
          {!hasNextPage && <BeginningMessage channel={channel} />}
        </>
      )}
    </InfiniteScroll>
  );
};

export default Messages;
